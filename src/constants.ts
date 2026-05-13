import { Book, Role } from './types.ts';

export const F1_RED = '#FF1801';
export const F1_DARK_BLUE = '#15151E';
export const F1_GRAY = '#38383F';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Art of Racing in the Rain',
    author: 'Garth Stein',
    isbn: '978-0061537936',
    category: 'Generic',
    available: true,
    publishedYear: 2008,
    addedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Coding',
    available: true,
    publishedYear: 2008,
    addedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Sustainability: A History',
    author: 'Jeremy L. Caradonna',
    isbn: '978-0199372409',
    category: 'Environment',
    available: false,
    publishedYear: 2014,
    addedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Advanced Racing Tactics',
    author: 'Stuart H. Walker',
    isbn: '978-0393033397',
    category: 'Strategy',
    available: true,
    publishedYear: 1991,
    addedAt: new Date().toISOString(),
  },
];

export const CATEGORIES = [
  'Coding',
  'Generic',
  'Environment',
  'Engineering',
  'Strategy',
  'History',
  'Biography',
];
