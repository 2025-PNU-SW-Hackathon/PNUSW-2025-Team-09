import { Author } from './author';

export type Comment = {
  id: string;
  author: Author;
  content: string;
  parent: string | null;
  children: Comment[] | null;
  createdAt: Date;
  updatedAt: Date;
};
