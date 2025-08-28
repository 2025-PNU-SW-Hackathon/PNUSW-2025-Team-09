class AuthorDto {
  id: string;
  nickname: string;
}

export class CreatePostsResponseDto {
  id: string;
  boardType: string;
  classType: string;
  contentType: string;
  author: AuthorDto;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
