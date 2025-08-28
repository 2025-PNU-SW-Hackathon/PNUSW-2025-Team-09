import { IsDefined, IsOptional, IsString } from 'class-validator';

export class UpdateCommentRequestDto {
  @IsDefined()
  @IsString()
  authorNickname: string;

  @IsOptional()
  @IsString()
  content?: string;
}
