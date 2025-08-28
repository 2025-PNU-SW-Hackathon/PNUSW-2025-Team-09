import { IsDefined, IsString } from 'class-validator';

export class DeletePostRequestDto {
  @IsDefined()
  @IsString()
  authorNickname: string;
}
