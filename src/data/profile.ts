// Facts drawn from CV.pdf. Headline copy built on top of these is placeholder until Kaiden rewrites it.
export const profile = {
  name: 'Kaiden Bell',
  role: 'Full-stack & hardware systems engineer',
  school: 'Computer Science & Engineering, University of Nevada, Reno',
  gradYear: 2027,
  place: 'Sparks, Nevada',
  coords: '39.53° N  119.75° W',
  github: 'https://github.com/Kaiden-Bell',
  githubHandle: 'Kaiden-Bell',
  email: 'kaidenbell50@gmail.com',
};

// Every item must resolve. Add About back when that page exists.
export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
];

export type Project = {
  id: string;
  name: string;
  short: string;
  line: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: 'vault',
    name: 'The Vault',
    short: 'Vault',
    line: 'A password manager that will not open without a hardware keypad.',
    stack: ['Python', 'Embedded C', 'UART', 'FastAPI', 'PostgreSQL', 'Argon2id'],
  },
  {
    id: 'armv7',
    name: 'ARMv7 Emulator',
    short: 'ARMv7',
    line: 'ARM, emulated instruction by instruction in C++.',
    stack: ['C/C++'],
  },
  {
    id: 'rlpredictor',
    name: 'RLPredictor',
    short: 'RLPredictor',
    line: 'Thirteen features, one neural net, and a lot of Rocket League replays.',
    stack: ['Python', 'PyTorch', 'SQL'],
  },
  {
    id: 'homelab',
    name: 'Homelab',
    short: 'Homelab',
    line: 'Nginx, Pi-hole, Prometheus and Grafana, running at home.',
    stack: ['Docker', 'Nginx', 'Linux'],
  },
  {
    id: 'autoapplier',
    name: 'AutoApplier',
    short: 'AutoApplier',
    line: 'An LLM tailors the résumé. A human still hits send.',
    stack: ['Python', 'Docker', 'FastAPI'],
  },
  {
    id: 'swamp',
    name: 'Swamp Cooler Controller',
    short: 'Swamp Cooler',
    line: 'Real-time climate control on a breadboard, in Arduino C.',
    stack: ['Embedded C', 'ADC / Timers'],
  },
  {
    id: 'bellball',
    name: 'Bell of the Ball',
    short: 'Bell of the Ball',
    line: 'An event-services site built in Astro for a real client.',
    stack: ['TypeScript', 'Astro'],
  },
  {
    id: 'waitlist',
    name: 'TMCC Waitlist',
    short: 'Waitlist',
    line: 'Watches a full class and texts you the moment a seat opens.',
    stack: ['Python', 'Docker'],
  },
];

export const stack = [
  'C/C++', 'Python', 'TypeScript', 'SQL', 'Embedded C', 'UART', 'ADC / Timers', 'PyTorch',
  'FastAPI', 'PostgreSQL', 'Docker', 'Nginx', 'Astro', 'React', 'Argon2id', 'Linux',
];
