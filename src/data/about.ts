import { profile, stack } from './profile';
import { work } from './work';

// Copy for the scenes under the cover. Everything is drawn from facts already on the site; the wording is a
// stand-in until Kaiden writes the real story. `mark` is the closing phrase that gets the gold highlighter.
export type Beat = { lead: string; mark: string; sub: string };

// About 1: the introduction. Face first, then who.
export const intro: { caption: string; beats: Beat[] } = {
  caption: 'Introduction',
  beats: [
    { lead: "I'm", mark: 'Kaiden Bell.', sub: `${profile.role}.` },
    {
      lead: 'I build it, then',
      mark: 'I design it.',
      sub: 'Web software, embedded systems and the interfaces that sit on top of them.',
    },
    {
      lead: `${profile.place}.`,
      mark: `Class of '${String(profile.gradYear).slice(2)}.`,
      sub: 'Computer Science & Engineering at the University of Nevada, Reno.',
    },
  ],
};

// About 2: the projects, and what is in the toolkit.
export const craft = {
  caption: 'The work',
  lead: { text: 'Two crafts,', mark: 'one practice.' },
  deck: 'Engineering and design are one job here: a thing is not finished until it runs and looks right.',
  projects: work,
  toolkit: {
    lead: { text: 'Both sides of', mark: 'the screen.' },
    engineering: stack,
    design: ['Interface & layout', 'Type & motion', 'Case studies'],
  },
};

// About 3: the world through the lens. The slab text is set into the photograph itself.
export const lens: { caption: string; slab: [string, string]; beats: Beat[] } = {
  caption: 'Through my lens',
  slab: ['The world', 'through my lens'],
  beats: [
    {
      lead: 'Everything starts as a',
      mark: 'frame.',
      sub: 'Before the code or the layout, I look at what is actually in the picture.',
    },
    {
      lead: 'Light first, then',
      mark: 'structure.',
      sub: 'Hierarchy is deciding where the eye lands, in a photograph or on a page.',
    },
    {
      lead: 'I build what I would',
      mark: 'stop to look at.',
      sub: 'Engineering that works, and design that earns a second look.',
    },
  ],
};

// The close: call to action, then the ways to reach me.
export const finale = {
  lead: { text: 'That was the', mark: 'trailer.' },
  cta: { label: 'Enter the reel', href: '/work' },
};
