export class CreateCommentResponseDto {
  id: string;
  author: {
    id: string;
    nickname: string;
  };
  content: string;
  parent: string | null;
  createdAt: Date;
  updatedAt: Date;
}
