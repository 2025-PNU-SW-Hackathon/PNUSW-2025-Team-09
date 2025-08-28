import { Post } from './post';

export interface GetPostsResponse {
  posts: Post[];
  hasMore: boolean;
}
