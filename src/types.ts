export enum Role {
  STUDENT = 'Student',
  EMPLOYEE = 'Employee',
  ADMIN = 'Admin'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  available: boolean;
  publishedYear: number;
  coverImage?: string;
  addedAt: string;
}

export interface BlogPost {
  id: string;
  authorName: string;
  authorRole: Role;
  authorId: string;
  content: string;
  timestamp: string;
  media?: {
    type: 'image' | 'gif' | 'link';
    url: string;
    preview?: string;
  };
  likes: number;
  comments: BlogComment[];
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorRole: Role;
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}
