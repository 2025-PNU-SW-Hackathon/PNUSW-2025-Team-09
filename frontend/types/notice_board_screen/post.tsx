import { Author } from './author';
import { Comment } from './comment';

export type Post = {
  id: string;
  boardType: string;
  classType: string;
  contentType: string;
  author: Author;
  title: string;
  content: string;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
};
