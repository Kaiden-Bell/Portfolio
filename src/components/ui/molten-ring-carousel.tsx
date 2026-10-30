// A carousel whose cards behave like drops of liquid held on glass.
//
// The circle is far larger than the frame and its centre sits well off to the
// left, so only a sliver of it ever crosses the viewport - which reads as a
// tall arc of work sweeping past with one card square to the viewer.
//
// There is no mesh here and there are no image elements. Each card is a
// rounded-box distance field and the frame is one fullscreen pass taking a
// smooth minimum over the lot. That single operator buys the physics: two cards
// approaching never overlap, their fields fuse; two separating leave a strand
// behind, because the strand is one more term in the same field and narrows,
// hangs and finally parts of its own accord as the distance grows.
//
// The cursor is never painted. It widens the fusion radius beneath itself, tips
// nearby cards toward it, elbows their neighbours aside, and draws strands out
// between them.
//
// This is the renderer only. It owns no copy and no input beyond the pointer:
// where the ring points is handed in as `position` (the page scroll drives it on
// the Work page), and what it sees is reported back through the callbacks.
// Titles, captions and the story dialog live in WorkGallery, over the top.
import * as React from 'react';

export interface MoltenRingItem {
  /** Cover art. Cross-origin sources must send CORS headers. */
  image: string;
}

export type MoltenRingStatus = 'entering' | 'moving' | 'settled';

export interface MoltenRingCarouselProps {
  items: MoltenRingItem[];
  /** Which card faces front, in slots. Fractions sit between two cards. */
  position: number;
  /** Darken and lift the front card, for the focus state. @default false */
  focus?: boolean;
  /** Stop drawing and ignore the pointer, keeping all state. @default false */
  paused?: boolean;
  /** Drop the liquid motion: no strands, wobble, wake or easing. @default false */
  reduced?: boolean;
  /** Ring radius, in stage widths. Larger flattens the arc. @default 1 */
  arc?: number;
  /** Card width, as a fraction of the stage width. @default 0.265 */
  cardSize?: number;
  /** Card width / height. Art is cover-fitted into it. @default 1.5 */
  cardRatio?: number;
  /** Centre to centre along the arc, in card heights. @default 1.55 */
  spacing?: number;
  /** Fusion radius between neighbours, in card widths. @default 0.087 */
  fuse?: number;
  /** String threads between cards as they pull apart. @default true */
  threads?: boolean;
  /** Optical band that bends the image at the upper and lower borders. @default true */
  glass?: boolean;
  className?: string;
  onActiveChange?: (index: number) => void;
  onHoverChange?: (index: number) => void;
  onStatusChange?: (status: MoltenRingStatus) => void;
  /** A press that never travelled far enough to be a drag. */
  onCardClick?: (index: number) => void;
  /** Mouse drags, in px (positive = dragged upward). Touch scrolls natively instead. */
  onDrag?: (dy: number) => void;
  /** No WebGL2: render a fallback instead. */
  onUnsupported?: () => void;
}

/** Each uniform-array element occupies a vec4 register; WebGL2 guarantees only
    224. Two dozen already exceeds what the visible arc can hold. */
const MAX_CARDS = 24;
const MAX_STRANDS = 24;

/* Every figure below is expressed as a multiple of the card's long edge, so
   proportions survive any viewport instead of being tuned to one screen. */
const FUSE = 0.087; // resting blend between neighbours
const CORNER = 0.015;
const CROSSFADE = 0.035; // over which neighbouring art crossfades inside the goo
const SPACING = 1.55; // default centre to centre along the arc, in short edges

/* Cursor. It contributes nothing to the picture; it only alters how the field
   responds nearby. Take-up and let-go run at different rates on purpose - a
   card tips toward the cursor briskly and returns at half the speed. */
const CURSOR_FUSE = 0.085; // blend added to the field at the cursor
const CURSOR_REACH = 0.65;
const PULL = 0.065; // how far a card leans toward the cursor
const SWELL = 0.09;
const REACH = 1.7; // radius of cursor influence, in card long edges
const GRAB = 0.14;
const RELEASE = 0.06;
const NEIGHBOUR_PUSH = 0.042; // how far the hovered card's neighbours get out of the way
const NEIGHBOUR_SCALE = 0.035;
const NEIGHBOUR_DIM = 0.15;
const NEIGHBOUR_REACH = 2.4;
const WAVE = 0.01; // capillary wake off a moving cursor
const WAVE_FREQ = 20;
const WAVE_SPEED = 7;

/* Focus. The front card dims under its title and grows a hair. */
const FOCUS_DIM = 0.42;
const FOCUS_SCALE = 0.018;
const FOCUS_EASE = 0.12;

/* Strands. Thickest where one leaves a card, waisted at the midpoint, and
   hanging lower the further it is drawn out. */
const STRAND = 0.2; // end thickness, relative to the edge it grows from
const STRAND_SNAP = 1.15; // gaps wider than this, in short edges, have snapped
const WAIST = 0.35;
const SAG = 0.015;
const WELD = 0.035;

/* Optical band running across the upper and lower borders. */
const BAND = 0.08; // fraction of the stage height
const REFRACT = 0.15;
const SQUEEZE = 0.05;
const RIPPLE = 0.0125;
const RIPPLE_FREQ = 8;
const FRINGE = 0.004;
const SHEEN = 0.05;

const WOBBLE = 0.0075; // surface tension noise while the ring is moving

/* Turn. The ring eases after the position it is handed. */
const EASE = 0.08;
const SETTLED = 0.004; // slots from the target that count as at rest
const CLICK_SLOP = 6;

/* Arrival. The deck begins fused into a single mass at the front and the
   circle draws it apart into slots, which is what produces the strands. */
const ENTRY_MS = 2600;

const THEME_EVERY = 20;
const MAX_CELL = 1024; // atlas cell width ceiling, px
const MAX_PIXELS = 4_200_000; // canvas backing-store budget before DPR is trimmed

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
/** A per-frame easing factor tuned at 60fps, rescaled so 120Hz and 30Hz screens move at the same speed. */
const perFrame = (k: number, dt: number) => 1 - Math.pow(1 - k, dt * 60);
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const QUAD_VERT = /* glsl */ `#version 300 es
in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos;
  gl_Position = vec4(aPos * 2.0 - 1.0, 0.0, 1.0);
}`;

const RING_FRAG = /* glsl */ `#version 300 es
precision highp float;

#define MAX_CARDS ${MAX_CARDS}
#define MAX_STRANDS ${MAX_STRANDS}

in vec2 vUv;
out vec4 fragColor;

uniform vec2  uResolution;   // px
uniform vec2  uSize;         // resting card size in px - long edge, short edge
uniform float uCorner;

uniform float uCount;
uniform vec2  uCentre[MAX_CARDS];   // centre in px, origin at the stage centre
uniform float uAngle[MAX_CARDS];   // radians
// xy = per-axis scale, z = brightness, w = atlas cell index. Packed together
// because a uniform-array slot is a full vec4 register regardless of the
// declared type, so zw are free once xy are spent.
uniform vec4  uCardState[MAX_CARDS];

uniform float uStrandCount;
uniform vec2  uStrandA[MAX_STRANDS];
uniform vec2  uStrandB[MAX_STRANDS];
uniform vec4  uStrandPar[MAX_STRANDS];  // end thickness, waist, hang, weld width

uniform float uFuse;            // blend strength, px
uniform float uJitter;
uniform float uTime;
uniform vec3  uColor;        // untextured fallback, and the loading silhouette

uniform sampler2D uAtlas;    // one sheet; sampler arrays need a constant index
uniform vec2  uGrid;         // cells across, down
uniform float uCrossfade;        // px over which neighbouring art crossfades
uniform float uHasArt;

uniform vec4  uCursor;        // xy in px, z = engaged 0..1, w = added fusion
uniform vec4  uWake;         // radius px, amplitude px, spatial freq, rate

uniform float uLipDepth;         // glass lip depth, px - 0 turns it off
uniform vec4  uLip;        // refract px, squeeze, ripple px, ripple frequency
uniform float uFringe;
uniform float uSheen;

vec2 atlasUV(vec2 uv, float idx) {
  return (vec2(mod(idx, uGrid.x), floor(idx / uGrid.x)) + uv) / uGrid;
}

/* Bilinear value noise. The perturbation is small and rides on a surface
   already in motion, so a simplex implementation would cost twenty more lines
   for a difference nobody could pick out. */
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  ) * 2.0 - 1.0;
}

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

/* One strand spanning two cards: a slab laid centre to centre, as thick at
   each end as the edge it grows from, waisted at the midpoint and hanging under
   its own weight.

   Swept as a box, not a capsule. A capsule's circular cross-section would
   balloon past the cards' own flat faces once they fused; a box tucks inside
   them, so a merged pair keeps the outline of a single card. */
float sdStrand(vec2 p, vec2 a, vec2 b, float rEnd, float rMid, float sag) {
  vec2 ba = b - a;
  float len = length(ba);
  if (len < 0.001) return 1e6;

  vec2 dir = ba / len;
  vec2 nrm = vec2(-dir.y, dir.x);
  vec2 q = p - (a + b) * 0.5;
  float along = dot(q, dir);
  float across = dot(q, nrm);

  float h = clamp(along / len + 0.5, 0.0, 1.0);
  float bell = sin(3.14159265 * h);        // peaks mid-span, vanishes at both ends
  across += sag * bell * nrm.y;            // hang, projected onto the perpendicular
  float r = mix(rMid, rEnd, pow(1.0 - bell, 1.7));

  // Square ends, which finish inside the cards and are never on screen.
  return max(abs(along) - len * 0.5, abs(across) - r);
}

/* Smooth minimum - the one operator the whole look rests on. Against the 1e6
   sentinel it degrades cleanly to an ordinary min(). */
float smin(float a, float b, float k) {
  if (k <= 0.0001) return min(a, b);
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

/* The upper and lower margins behave like the ground edge of a thick pane.
   Since the whole scene is evaluated from p, displacing p at this point bends
   cards and strands together in one pass - no extra target, no second warp. */
float lipWarp(inout vec2 p) {
  if (uLipDepth <= 0.5) return 0.0;
  float dy = abs(p.y) - (uResolution.y * 0.5 - uLipDepth);
  if (dy <= 0.0) return 0.0;

  float t = clamp(dy / uLipDepth, 0.0, 1.0);
  // A circular falloff: almost flat where the band begins and dropping away
  // steeply at the boundary, which is what sells depth over a plain gradient.
  float bend = 1.0 - sqrt(max(0.0, 1.0 - t * t));

  // Sampling from deeper inside displaces detail toward the margin, so the
  // image elongates into the band and grows as it nears the boundary.
  p.y -= sign(p.y) * bend * (uLip.x + sin(p.x * uLip.w) * uLip.z);
  p.x *= 1.0 - bend * uLip.y;
  return bend;
}

void main() {
  vec2 p = (vUv - 0.5) * uResolution;
  float bend = lipWarp(p);

  // Measured after the displacement so the cursor lives in the same warped
  // space the cards do - carried into the band, its influence bends along with
  // them instead of lying flat across the top.
  float toCursor = length(p - uCursor.xy);

  // Fusion radius rises within a pool centred on the pointer, slackening the
  // field just where contact occurs while it stays taut elsewhere. Computed once
  // per pixel rather than per card, costing a single length() for the loop.
  float k = uFuse;
  if (uCursor.z > 0.001) {
    float t = 1.0 - smoothstep(0.0, max(uWake.x, 1.0), toCursor);
    k += uCursor.w * uCursor.z * t * t;
  }

  float d = 1e6;

  // The nearest two cards, carried alongside the distance so colour resolves in
  // the same loop rather than a second one. Where the field bridges a pair both
  // register as close, which is precisely where the crossfade should sit.
  float d0 = 1e6, d1 = 1e6;
  vec2 uv0 = vec2(0.5), uv1 = vec2(0.5);
  float im0 = 0.0, im1 = 0.0;
  float dm0 = 1.0, dm1 = 1.0;

  float halfSpan = length(uSize) * 0.5;

  for (int i = 0; i < MAX_CARDS; i++) {
    if (float(i) >= uCount) break;

    vec4 st = uCardState[i];
    float grown = max(st.x, st.y);
    if (grown <= 0.0001) continue;

    vec2 q = p - uCentre[i];
    // Beyond this radius a card cannot reach the surface, so it is rejected
    // before any transcendentals run - which is what makes two dozen of them
    // affordable. Sized off the card itself, since one swollen beneath the
    // cursor covers more ground than its resting footprint, as does the wider
    // fusion radius around it.
    float cull = halfSpan * grown + k + uJitter + 8.0;
    if (dot(q, q) > cull * cull) continue;

    float ca = cos(uAngle[i]), sa = sin(uAngle[i]);
    q = vec2(q.x * ca + q.y * sa, -q.x * sa + q.y * ca);

    vec2 halfSize = max(uSize * 0.5 * st.xy, vec2(0.0001));
    // Opens as a lozenge and settles into the rounded rectangle as it grows, so
    // arrival reads as a droplet finding its form, not a box being scaled.
    float rMax = min(halfSize.x, halfSize.y);
    float r = min(rMax, mix(rMax, uCorner, smoothstep(0.30, 1.0, min(st.x, st.y))));

    float di = sdRoundBox(q, halfSize, r);
    d = smin(d, di, k);

    // Clamped so that fused area beyond a card's own bounds takes that card's
    // edge pixels instead of tiling or spilling into the adjacent atlas cell.
    vec2 luv = clamp(q / (2.0 * halfSize) + 0.5, 0.004, 0.996);
    luv.y = 1.0 - luv.y;

    if (di < d0) {
      d1 = d0; uv1 = uv0; im1 = im0; dm1 = dm0;
      d0 = di; uv0 = luv; im0 = st.w; dm0 = st.z;
    } else if (di < d1) {
      d1 = di; uv1 = luv; im1 = st.w; dm1 = st.z;
    }
  }

  for (int i = 0; i < MAX_STRANDS; i++) {
    if (float(i) >= uStrandCount) break;
    vec4 par = uStrandPar[i];
    // Negative radii are allowed, and wanted: they raise the strand's field
    // above the surface so it withdraws smoothly instead of stalling at zero
    // and leaving a half-resolved hairline behind.
    if (par.x <= -3.0) continue;
    vec2 a = uStrandA[i], b = uStrandB[i];
    vec2 mid = (a + b) * 0.5;
    float span = length(b - a) * 0.5 + par.x + par.w + 8.0;
    if (dot(p - mid, p - mid) > span * span) continue;
    d = smin(d, sdStrand(p, a, b, par.x, par.y, par.z), par.w);
  }

  // Surface tension, scaled to nothing at rest so a settled ring is perfectly
  // smooth.
  if (uJitter > 0.001) {
    d += noise(p * 0.012 + vec2(uTime * 0.22, uTime * -0.17)) * uJitter;
  }

  // A wake trailing the cursor, expanding outward and decaying over the same
  // radius the slackening uses, so a quick pass leaves a disturbance that
  // persists a moment after the gesture ends.
  if (uWake.y > 0.001) {
    d += sin(toCursor * uWake.z - uTime * uWake.w)
       * uWake.y * exp(-toCursor / max(uWake.x, 1.0));
  }

  // Bounded at both ends rather than only below. The rejection test above puts
  // a discontinuity in the field, and fwidth measured across it would return a
  // huge derivative, tracing a translucent seam along every rejection boundary.
  float aa = clamp(fwidth(d), 0.5, 2.0);
  float alpha = 1.0 - smoothstep(-aa, aa, d);
  if (alpha <= 0.001) discard;

  // Equal weight where the two nearest cards tie, settling on whichever leads
  // once the margin exceeds the crossfade width. Artwork and brightness both
  // ride this weight, so neither can leave a visible join through fused area.
  float nearest = smoothstep(-uCrossfade, uCrossfade, d1 - d0);

  vec3 col = uColor;
  if (uHasArt > 0.5) {
    // Branch on a uniform, keeping derivatives well defined across the quad.
    // The offset scales with band depth, so outside it all three taps collapse
    // onto one texel.
    vec2 fr = vec2(uFringe * bend, 0.0);
    vec3 c0 = vec3(
      texture(uAtlas, atlasUV(uv0 + fr, im0)).r,
      texture(uAtlas, atlasUV(uv0, im0)).g,
      texture(uAtlas, atlasUV(uv0 - fr, im0)).b
    );
    vec3 c1 = vec3(
      texture(uAtlas, atlasUV(uv1 + fr, im1)).r,
      texture(uAtlas, atlasUV(uv1, im1)).g,
      texture(uAtlas, atlasUV(uv1 - fr, im1)).b
    );
    col = mix(c1, c0, nearest);
  }

  // Every card except the selected one is attenuated, leaving that card the
  // only fully lit surface in the frame.
  col *= mix(dm1, dm0, nearest);

  // A little brightening where the band is steepest, so it reads as a surface
  // taking light and not purely as a distortion.
  col += bend * uSheen;

  fragColor = vec4(col, alpha);
}`;

function build(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, vert],
    [gl.FRAGMENT_SHADER, frag],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.bindAttribLocation(program, 0, 'aPos');
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

/** Cached uniform handles. getUniformLocation performs a string lookup on every
    call, and this sits inside the per-frame path. */
function uniforms(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const cache = new Map<string, WebGLUniformLocation | null>();
  return (name: string) => {
    let loc = cache.get(name);
    if (loc === undefined) {
      loc = gl.getUniformLocation(program, name);
      cache.set(name, loc);
    }
    return loc;
  };
}

/** Resolves any CSS colour to 0-1 RGB by asking the browser instead of parsing
    it. Theme tokens here are written in oklch, and naive comma-splitting of the
    computed string yields a confidently incorrect near-black. */
function colorReader() {
  const probe = document.createElement('canvas');
  probe.width = probe.height = 1;
  const ctx = probe.getContext('2d', { willReadFrequently: true });
  return (css: string): [number, number, number] => {
    if (!ctx) return [0, 0, 0];
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return [r / 255, g / 255, b / 255];
  };
}

/** A single sheet, each cell cover-fitted. ESSL forbids indexing a sampler
    array with a non-constant expression, ruling out one texture per card. */
function packAtlas(images: HTMLImageElement[], cols: number, cell: number, ratio: number) {
  const rows = Math.ceil(images.length / cols);
  const cellH = Math.round(cell / ratio);
  const sheet = document.createElement('canvas');
  sheet.width = cols * cell;
  sheet.height = rows * cellH;
  const ctx = sheet.getContext('2d');
  if (!ctx) return sheet;
  images.forEach((image, i) => {
    // A card that never decoded has no natural size; scaling by it yields
    // Infinity and drawImage throws, taking every later cell with it.
    if (!image.naturalWidth || !image.naturalHeight) return;
    const x = (i % cols) * cell;
    const y = Math.floor(i / cols) * cellH;
    const scale = Math.max(cell / image.naturalWidth, cellH / image.naturalHeight);
    const w = image.naturalWidth * scale;
    const h = image.naturalHeight * scale;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, cell, cellH);
    ctx.clip();
    ctx.drawImage(image, x + (cell - w) / 2, y + (cellH - h) / 2, w, h);
    ctx.restore();
  });
  return sheet;
}

export function MoltenRingCarousel({
  items,
  position,
  focus = false,
  paused = false,
  reduced = false,
  arc = 1,
  cardSize = 0.265,
  cardRatio = 1.5,
  spacing = SPACING,
  fuse = FUSE,
  threads = true,
  glass = true,
  className,
  onActiveChange,
  onHoverChange,
  onStatusChange,
  onCardClick,
  onDrag,
  onUnsupported,
}: MoltenRingCarouselProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  /** Bumped when a lost context comes back, which rebuilds everything below. */
  const [generation, setGeneration] = React.useState(0);

  // Everything the frame loop reads lives in one ref, so a new prop never tears
  // the GL context down - only the art and the context itself do that.
  const live = React.useRef({
    position, focus, paused, arc, cardSize, cardRatio, spacing, fuse, threads, glass,
    onActiveChange, onHoverChange, onStatusChange, onCardClick, onDrag,
  });
  live.current = {
    position, focus, paused, arc, cardSize, cardRatio, spacing, fuse, threads, glass,
    onActiveChange, onHoverChange, onStatusChange, onCardClick, onDrag,
  };
  /** Lets the pause flag restart a stopped loop without rebuilding it. */
  const wake = React.useRef<() => void>(() => {});
  /** The arrival plays once per mount, not again after a context restore. */
  const arrived = React.useRef(false);

  const count = Math.min(items.length, MAX_CARDS);
  const sources = items.map((item) => item.image).join(' ');

  React.useEffect(() => {
    if (!paused) wake.current();
  }, [paused]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !count) return;
    // Unpremultiplied alpha, so whatever the ring does not cover is simply the
    // page underneath - which is how the shader stays theme-agnostic without
    // ever being handed the palette.
    const gl = canvas.getContext('webgl2', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) {
      onUnsupported?.();
      return;
    }

    const readColor = colorReader();
    const program = build(gl, QUAD_VERT, RING_FRAG);
    if (!program) {
      onUnsupported?.();
      return;
    }
    const u = uniforms(gl, program);

    const quad = gl.createVertexArray();
    gl.bindVertexArray(quad);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // --- state ------------------------------------------------------------
    let width = 0;
    let height = 0;
    let dpr = 1;
    let progress = live.current.position;
    let hovered = -1;
    let pointerX = -1;
    let pointerY = -1;
    let pointerSpeed = 0;
    let entry = arrived.current || reduced ? 1 : 0;
    let focusLevel = 0;
    let clock = 0;
    let previous = 0;
    let ticks = 0;
    let frame = 0;
    let running = false;
    let visible = false;
    /** Half the stage on screen: the arrival waits for this so it is actually seen. */
    let revealed = arrived.current;
    let lost = false;
    let ink: [number, number, number] = [0, 0, 0];
    let reportedActive = -1;
    let reportedHover = -2;
    let reportedStatus: MoltenRingStatus | null = null;

    // --- art --------------------------------------------------------------
    const COLS = Math.min(4, count);
    const ROWS = Math.ceil(count / COLS);
    let atlas: WebGLTexture | null = null;
    let loaded = 0;
    const images = items.slice(0, count).map((item) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.decoding = 'async';
      // Settled, not loaded. The sheet is all-or-nothing, so a single URL that
      // 404s or fails CORS would otherwise hold every card untextured for the
      // life of the component - the failure mode is a blank white ring with
      // nothing in the console.
      const settle = () => {
        if (++loaded < count || lost) return;
        // Cells are sized to what a card actually covers on this screen, then
        // capped so the whole sheet fits the GPU's texture limit - a 4K sheet
        // is wasted on a phone and refused outright by some of them.
        const ratio = live.current.cardRatio;
        const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
        const wanted = Math.round(width * live.current.cardSize * dpr) || 512;
        const cell = Math.max(
          128,
          Math.min(MAX_CELL, wanted, Math.floor(maxTex / COLS), Math.floor((maxTex * ratio) / ROWS)),
        );
        // Assembled once the last image settles; packing early would leave unset
        // cells sampling as solid black cards.
        atlas = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, atlas);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, packAtlas(images, COLS, cell, ratio));
        // Mipmaps are skipped - lower levels would average across cell borders,
        // and cards occupy enough pixels that minification never applies.
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        start();
      };
      image.onload = settle;
      image.onerror = () => {
        console.warn(`molten-ring-carousel: ${item.image} failed to load`);
        settle();
      };
      image.src = item.image;
      return image;
    });

    const leanX = new Float32Array(count);
    const leanY = new Float32Array(count);
    const swell = new Float32Array(count);
    const dim = new Float32Array(count);

    const pos = new Float32Array(MAX_CARDS * 2);
    const rot = new Float32Array(MAX_CARDS);
    const scale = new Float32Array(MAX_CARDS * 4);
    const strandA = new Float32Array(MAX_STRANDS * 2);
    const strandB = new Float32Array(MAX_STRANDS * 2);
    const strandPar = new Float32Array(MAX_STRANDS * 4);

    /** Per-frame screen placement for every card, used by hit-testing and by the
        strand solver below. */
    const at = Array.from({ length: count }, () => ({ x: 0, y: 0, angle: 0, scale: 1 }));

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      // Full DPR on a big screen is millions of fragments through the whole
      // field per frame; past the budget the backing store is scaled down.
      dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(MAX_PIXELS / (w * h)));
      width = w;
      height = h;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      start();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Nothing is drawn while the stage is off screen; state is kept as it was.
    const sight = new IntersectionObserver(
      ([record]) => {
        visible = record.isIntersecting;
        if (record.intersectionRatio >= 0.5) revealed = true;
        start();
      },
      { threshold: [0, 0.5] },
    );
    sight.observe(canvas);

    // --- input ------------------------------------------------------------
    // Mouse drags are reported, not applied: the page owns position. Touch is
    // left to the browser (touch-action: pan-y), so a swipe scrolls the page
    // and the page turns the ring.
    let pressAt: { x: number; y: number } | null = null;
    let travel = 0;
    let dragY: number | null = null;
    const onDown = (event: PointerEvent) => {
      if (live.current.paused) return;
      pressAt = { x: event.clientX, y: event.clientY };
      travel = 0;
      if (event.pointerType === 'mouse') {
        dragY = event.clientY;
        canvas.setPointerCapture(event.pointerId);
      }
    };
    const onMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      const nx = event.clientX - box.left;
      const ny = event.clientY - box.top;
      pointerSpeed = Math.hypot(nx - pointerX, ny - pointerY);
      pointerX = nx;
      pointerY = ny;
      if (pressAt) travel = Math.max(travel, Math.hypot(event.clientX - pressAt.x, event.clientY - pressAt.y));
      if (dragY !== null && travel >= CLICK_SLOP) {
        live.current.onDrag?.(dragY - event.clientY);
        dragY = event.clientY;
      }
      start();
    };
    const onUp = () => {
      const wasClick = pressAt !== null && travel < CLICK_SLOP;
      pressAt = null;
      dragY = null;
      if (wasClick && hovered >= 0 && !live.current.paused) live.current.onCardClick?.(hovered);
    };
    const onCancel = () => {
      pressAt = null;
      dragY = null;
    };
    const onLeave = () => {
      pointerX = -1;
      pointerY = -1;
      hovered = -1;
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onCancel);
    canvas.addEventListener('pointerleave', onLeave);

    const onLost = (event: Event) => {
      // Asking for a restore; without preventDefault the context stays dead.
      event.preventDefault();
      lost = true;
      cancelAnimationFrame(frame);
      running = false;
    };
    const onRestored = () => setGeneration((g) => g + 1);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);

    // --- frame ------------------------------------------------------------
    function start() {
      if (running || lost || !visible || live.current.paused || !width) return;
      running = true;
      previous = 0;
      frame = requestAnimationFrame(draw);
    }
    wake.current = start;

    const draw = (now: number) => {
      const config = live.current;
      if (!visible || config.paused || lost) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(draw);
      const dt = previous ? Math.min((now - previous) / 1000, 1 / 20) : 0;
      previous = now;
      clock += dt;

      if (ticks++ % THEME_EVERY === 0) ink = readColor(getComputedStyle(canvas).color);

      if (atlas && revealed) entry = reduced ? 1 : Math.min(1, entry + (dt * 1000) / ENTRY_MS);
      if (entry >= 1) arrived.current = true;
      const spread = inOutCubic(entry);

      // --- turn -----------------------------------------------------------
      const goal = config.position;
      progress = reduced ? goal : progress + (goal - progress) * perFrame(EASE, dt);
      const speed = Math.abs(goal - progress);

      const near = ((Math.round(goal) % count) + count) % count;
      if (near !== reportedActive) {
        reportedActive = near;
        config.onActiveChange?.(near);
      }
      const status: MoltenRingStatus = entry < 1 ? 'entering' : speed > SETTLED ? 'moving' : 'settled';
      if (status !== reportedStatus) {
        reportedStatus = status;
        config.onStatusChange?.(status);
      }

      const wantFocus = config.focus && status === 'settled' ? 1 : 0;
      focusLevel = reduced ? wantFocus : focusLevel + (wantFocus - focusLevel) * perFrame(FOCUS_EASE, dt);

      // --- geometry --------------------------------------------------------
      const long = width * config.cardSize;
      const short = long / config.cardRatio;
      const radius = width * config.arc;
      const angleStep = (short * config.spacing) / radius;
      const centreX = -radius; // the ring's near point lands on the stage centre

      for (let i = 0; i < count; i++) {
        // Wrapped into [-count/2, count/2) so the ring closes on itself off screen.
        let slot = (((i - progress) % count) + count) % count;
        if (slot >= count / 2) slot -= count;
        // The deck begins collapsed at the front slot and spreads outward into
        // position, which is the motion that pulls the strands.
        const angle = slot * angleStep * spread;
        at[i].angle = angle;
        at[i].x = centreX + Math.cos(angle) * radius;
        at[i].y = Math.sin(angle) * radius;
      }

      // --- pointer ---------------------------------------------------------
      // Cursor mapped into shader space - origin mid-stage, y increasing upward.
      const present = pointerX >= 0 && !reduced ? 1 : 0;
      const mx = present ? pointerX - width / 2 : 0;
      const my = present ? height / 2 - pointerY : 0;

      if (pointerX >= 0 && pointerSpeed < 24) {
        const hx = pointerX - width / 2;
        const hy = height / 2 - pointerY;
        hovered = -1;
        let best = Infinity;
        for (let i = 0; i < count; i++) {
          const dx = Math.abs(hx - at[i].x);
          const dy = Math.abs(hy - at[i].y);
          if (dx > long / 2 || dy > short / 2) continue;
          const distance = dx + dy;
          if (distance < best) {
            best = distance;
            hovered = i;
          }
        }
      }
      pointerSpeed *= 0.85;
      if (hovered !== reportedHover) {
        reportedHover = hovered;
        config.onHoverChange?.(hovered);
      }

      let strands = 0;
      for (let i = 0; i < count; i++) {
        const dx = mx - at[i].x;
        const dy = my - at[i].y;
        const pull = present ? Math.max(0, 1 - Math.hypot(dx, dy) / (long * REACH)) : 0;
        const isHovered = i === hovered && present ? 1 : 0;

        // Tipping toward the cursor is quick and returning is slow; that
        // asymmetry is what gives the surface a sense of mass.
        const towardX = dx * (pull * pull) * PULL * long * 0.02;
        const towardY = dy * (pull * pull) * PULL * long * 0.02;
        leanX[i] += (towardX - leanX[i]) * (pull > 0 ? GRAB : RELEASE);
        leanY[i] += (towardY - leanY[i]) * (pull > 0 ? GRAB : RELEASE);

        // Neighbours clear a path for the pointed-at card. The block above
        // tracks the cursor; this one tracks the card it settled on.
        let push = 0;
        let dimTarget = 0;
        if (present && hovered >= 0 && i !== hovered) {
          let gap = Math.abs(i - hovered);
          gap = Math.min(gap, count - gap);
          const off = Math.max(0, 1 - gap / NEIGHBOUR_REACH);
          push = Math.sign(at[i].y - at[hovered].y || 1) * off * NEIGHBOUR_PUSH * long;
          dimTarget = off * NEIGHBOUR_DIM;
        }
        dim[i] += (dimTarget - dim[i]) * (dimTarget > dim[i] ? GRAB : RELEASE);

        // The pointed-at card grows and its neighbours shed the same amount.
        const wantSwell =
          pull * pull * SWELL + isHovered * NEIGHBOUR_SCALE - dimTarget * (NEIGHBOUR_SCALE / NEIGHBOUR_DIM);
        swell[i] += (wantSwell - swell[i]) * (wantSwell > swell[i] ? GRAB : RELEASE);

        // The front card carries the focus: darker under its title, a hair larger.
        const front = i === near ? focusLevel : 0;

        at[i].x += leanX[i];
        at[i].y += leanY[i] + push;
        at[i].scale = (0.18 + 0.82 * spread) * (1 + swell[i] + front * FOCUS_SCALE);

        pos[i * 2] = at[i].x;
        pos[i * 2 + 1] = at[i].y;
        rot[i] = at[i].angle;
        scale[i * 4] = at[i].scale;
        scale[i * 4 + 1] = at[i].scale;
        scale[i * 4 + 2] = (1 - dim[i]) * (1 - front * FOCUS_DIM);
        scale[i * 4 + 3] = i;
      }

      // --- strands ----------------------------------------------------------
      // Narrowing, hanging and parting all fall out of the field itself - none
      // of it is animated, because a strand is a term in the same equation
      // rather than a shape drawn between two cards.
      if (config.threads && !reduced) {
        for (let i = 0; i < count && strands < MAX_STRANDS; i++) {
          const j = (i + 1) % count;
          // Only neighbours that are actually adjacent on the visible arc.
          const gap = Math.hypot(at[j].x - at[i].x, at[j].y - at[i].y);
          const opening = (gap - short) / (short * STRAND_SNAP);
          if (opening > 1 || opening < -1) continue;
          // Present while the deck is still spreading, and anywhere the cursor
          // is holding a pair apart.
          const strength = Math.max(1 - spread, present && (hovered === i || hovered === j) ? 1 : 0);
          if (strength < 0.02) continue;
          const rEnd = short * 0.5 * STRAND * strength * (1 - clamp(opening, 0, 1));
          if (rEnd <= 0.5) continue;
          strandA[strands * 2] = at[i].x;
          strandA[strands * 2 + 1] = at[i].y;
          strandB[strands * 2] = at[j].x;
          strandB[strands * 2 + 1] = at[j].y;
          strandPar[strands * 4] = rEnd;
          strandPar[strands * 4 + 1] = rEnd * WAIST;
          strandPar[strands * 4 + 2] = SAG * long * clamp(opening, 0, 1);
          strandPar[strands * 4 + 3] = WELD * long;
          strands++;
        }
      }

      // --- draw -------------------------------------------------------------
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(quad);

      gl.uniform2f(u('uResolution'), width, height);
      gl.uniform2f(u('uSize'), long, short);
      gl.uniform1f(u('uCorner'), CORNER * long);
      gl.uniform1f(u('uCount'), count);
      gl.uniform2fv(u('uCentre'), pos);
      gl.uniform1fv(u('uAngle'), rot);
      gl.uniform4fv(u('uCardState'), scale);
      gl.uniform1f(u('uStrandCount'), strands);
      gl.uniform2fv(u('uStrandA'), strandA);
      gl.uniform2fv(u('uStrandB'), strandB);
      gl.uniform4fv(u('uStrandPar'), strandPar);
      gl.uniform1f(u('uFuse'), config.fuse * long);
      // Falls to zero at rest, leaving a settled ring perfectly smooth.
      gl.uniform1f(u('uJitter'), reduced ? 0 : WOBBLE * long * clamp(speed * 2 + (1 - spread), 0, 1));
      gl.uniform1f(u('uTime'), reduced ? 0 : clock);
      gl.uniform3fv(u('uColor'), ink);
      gl.uniform1f(u('uCrossfade'), CROSSFADE * long);
      gl.uniform1f(u('uHasArt'), atlas ? 1 : 0);
      gl.uniform2f(u('uGrid'), COLS, ROWS);
      gl.uniform4f(u('uCursor'), mx, my, present, CURSOR_FUSE * long);
      gl.uniform4f(
        u('uWake'),
        CURSOR_REACH * long,
        reduced ? 0 : WAVE * long * clamp(pointerSpeed / 40, 0, 1),
        WAVE_FREQ / long,
        WAVE_SPEED,
      );
      gl.uniform1f(u('uLipDepth'), config.glass && !reduced ? BAND * height : 0);
      gl.uniform4f(u('uLip'), REFRACT * long, SQUEEZE, RIPPLE * long, RIPPLE_FREQ / long);
      gl.uniform1f(u('uFringe'), FRINGE);
      gl.uniform1f(u('uSheen'), SHEEN);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, atlas);
      gl.uniform1i(u('uAtlas'), 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // A settled, untouched ring has nothing left to animate; stop until the
      // position, focus, pointer or size gives it a reason to move again.
      const idle =
        status === 'settled' &&
        pointerX < 0 &&
        Math.abs(focusLevel - wantFocus) < 0.002 &&
        swell.every((s) => Math.abs(s) < 0.0005) &&
        dim.every((v) => v < 0.0005);
      if (idle) {
        cancelAnimationFrame(frame);
        running = false;
      }
    };

    return () => {
      cancelAnimationFrame(frame);
      running = false;
      wake.current = () => {};
      observer.disconnect();
      sight.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onCancel);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('webglcontextlost', onLost);
      canvas.removeEventListener('webglcontextrestored', onRestored);
      for (const image of images) image.onload = image.onerror = null;
      if (!lost) {
        if (atlas) gl.deleteTexture(atlas);
        gl.deleteBuffer(buffer);
        gl.deleteVertexArray(quad);
        gl.deleteProgram(program);
      }
    };
    // `sources` stands in for `items`: the loop owns the atlas, so it must
    // rebuild when the pictures change and must not when a label does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, count, reduced, generation]);

  // Position and focus changes have to restart a loop that went idle.
  React.useEffect(() => {
    wake.current();
  }, [position, focus, cardSize, arc]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

export default MoltenRingCarousel;
