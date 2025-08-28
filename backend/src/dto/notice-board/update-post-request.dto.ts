import { IsDefined, IsOptional, IsString } from 'class-validator';

export class UpdatePostRequestDto {
  @IsDefined()
  @IsString()
  authorNickname: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
