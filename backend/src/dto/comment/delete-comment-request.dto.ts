import { IsDefined, IsString } from 'class-validator';

export class DeleteCommentRequestDto {
  @IsDefined()
  @IsString()
  authorNickname: string;
}
