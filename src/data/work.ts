// Featured work for the /work reel. Copy marked generic is a stand-in until Kaiden supplies the real facts.
export type Work = {
  id: 'rootmap' | 'bellball' | 'randomevents';
  name: string;
  category: string;
  year: string;
  line: string;
  stack: string[];
  href: string;
};

export const work: Work[] = [
  {
    id: 'rootmap',
    name: 'RootMap',
    category: 'Project category',
    year: '2026',
    line: 'One sentence about the project.',
    stack: ['Stack'],
    href: 'https://github.com/Kaiden-Bell',
  },
  {
    id: 'bellball',
    name: 'Bell of the Ball',
    category: 'Project category',
    year: '2026',
    line: 'An event-services site built in Astro for a real client.',
    stack: ['Astro', 'TypeScript'],
    href: 'https://belloftheballreno.com',
  },
  {
    id: 'randomevents',
    name: 'RandomEvents',
    category: 'Project category',
    year: '2026',
    line: 'One sentence about the project.',
    stack: ['Stack'],
    href: 'https://github.com/Kaiden-Bell',
  },
];
