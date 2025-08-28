import { IsDefined, IsString } from 'class-validator';

export class CreatePostRequestDto {
  @IsDefined()
  @IsString()
  boardType: string;

  @IsDefined()
  @IsString()
  classType: string;

  @IsDefined()
  @IsString()
  contentType: string;

  @IsDefined()
  @IsString()
  authorNickname: string;

  @IsDefined()
  @IsString()
  title: string;

  @IsDefined()
  @IsString()
  content: string;
}
