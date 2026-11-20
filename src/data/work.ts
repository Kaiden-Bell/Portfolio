// Featured work for the /work reel, the cover list and the About craft panels.
// Categories and years are drafts: Kaiden to confirm before launch.
//
// Photos: drop src/assets/work/<id>.(png|jpg|jpeg|webp|avif) and the reel and story pick it up.
// Without one the frame falls back to a flat tone.
export type Work = {
  id: string;
  name: string;
  category: string;
  year: string;
  line: string;
  stack: string[];
  href: string;
  /** Describes the photo for screen readers. Leave empty if the photo is purely decorative. */
  photoAlt?: string;
  /** CSS object-position for cropping the photo, e.g. '50% 0%' to keep the top. Defaults to top centre. */
  photoFocus?: string;
};

export const work: Work[] = [
  {
    id: 'vault',
    name: 'The Vault',
    category: 'Hardware security',
    year: '2026',
    line: 'A password manager that will not open without a hardware keypad.',
    stack: ['Python', 'Embedded C', 'UART', 'FastAPI', 'PostgreSQL', 'Argon2id'],
    href: 'https://github.com/Kaiden-Bell/Password-Manager',
    photoAlt: "A 4×4 keypad wired to an Elegoo board and breadboard LEDs, next to The Vault's unlock screen reading 'PIN accepted'.",
  },
  {
    id: 'rlpredictor',
    name: 'RLPredictor',
    category: 'Machine learning',
    year: '2026',
    line: 'Thirteen features, one neural net, and a lot of Rocket League replays.',
    stack: ['Python', 'PyTorch', 'SQL'],
    href: 'https://github.com/Kaiden-Bell/RLPredictor',
  },
  {
    id: 'bellball',
    name: 'Bell of the Ball',
    category: 'Client web',
    year: '2026',
    line: 'An event-services site built in Astro for a real client.',
    stack: ['TypeScript', 'Astro'],
    href: 'https://belloftheballreno.com',
  },
  {
    id: 'languageai',
    name: 'Language AI',
    category: 'Local AI',
    year: '2026',
    line: 'Every Spanish word you study becomes a quiz, graded by a model that never leaves your machine.',
    stack: ['Python', 'FastAPI', 'React', 'TypeScript', 'Ollama', 'Docker'],
    href: 'https://github.com/Kaiden-Bell/LanguageAI',
  },
  {
    id: 'autoapplier',
    name: 'AutoApplier',
    category: 'LLM tooling',
    year: '2026',
    line: 'An LLM tailors the résumé. A human still hits send.',
    stack: ['Python', 'Docker', 'FastAPI'],
    href: 'https://github.com/Kaiden-Bell/AutoApplier',
  },
  {
    id: 'waitlist',
    name: 'TMCC Waitlist',
    category: 'Automation',
    year: '2026',
    line: 'Watches a full class and texts you the moment a seat opens.',
    stack: ['Python', 'Docker'],
    href: 'https://github.com/Kaiden-Bell/TMCC-Waitlist',
  },
];
