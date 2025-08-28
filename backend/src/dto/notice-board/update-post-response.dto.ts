class AuthorDto {
  id: string;
  nickname: string;
}

export class UpdatePostResponseDto {
  success: boolean;
  updatedPost?: {
    id: string;
    boardType: string;
    classType: string;
    contentType: string;
    author: AuthorDto;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
  latestPost?: {
    id: string;
    boardType: string;
    classType: string;
    contentType: string;
    author: AuthorDto;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
  error?: string;
}
