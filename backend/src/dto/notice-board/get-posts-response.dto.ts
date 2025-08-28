class AuthorDto {
  id: string;
  nickname: string;
}

export class CommentDto {
  id: string;
  author: AuthorDto;
  content: string;
  parent: string | null;
  children: CommentDto[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export class PostDto {
  id: string;
  boardType: string;
  classType: string;
  contentType: string;
  author: AuthorDto;
  title: string;
  content: string;
  comments: CommentDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class GetPostsResponseDto {
  posts: PostDto[];
  hasMore: boolean;
}
