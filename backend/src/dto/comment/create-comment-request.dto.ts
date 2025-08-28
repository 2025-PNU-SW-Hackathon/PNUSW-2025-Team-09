import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateCommentRequestDto {
  @IsDefined()
  @IsString()
  authorNickname: string;

  @IsDefined()
  @IsString()
  postId: string;

  @IsOptional()
  @IsString()
  parentId?: string;

  @IsDefined()
  @IsString()
  content: string;
}
