import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class GetPostsRequestDto {
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
  @Type(() => Number)
  @IsInt()
  limit: number;

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsString()
  targetId?: string;
}
