import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { NoticeBoardService } from '../service/notice-board.service';
import { CreatePostRequestDto } from '../dto/notice-board/create-post-request.dto';
import { GetPostsRequestDto } from '../dto/notice-board/get-posts-request.dto';
import { GetPostsResponseDto } from '../dto/notice-board/get-posts-response.dto';
import { CreatePostsResponseDto } from '../dto/notice-board/create-post-response.dto';
import { UpdatePostRequestDto } from '../dto/notice-board/update-post-request.dto';
import { UpdatePostResponseDto } from '../dto/notice-board/update-post-response.dto';
import { DeletePostRequestDto } from '../dto/notice-board/delete-post-request.dto';
import { DeletePostResponseDto } from '../dto/notice-board/delete-post-response.dto';

@Controller('notice-board')
export class NoticeBoardController {
  constructor(private readonly noticeBoardService: NoticeBoardService) {}

  @Post('post')
  createPost(
    @Body() body: CreatePostRequestDto,
  ): Promise<CreatePostsResponseDto> {
    return this.noticeBoardService.createPost(body);
  }

  @Get('get')
  getPosts(@Query() query: GetPostsRequestDto): Promise<GetPostsResponseDto> {
    return this.noticeBoardService.getPosts(query);
  }

  @Patch('patch/:id')
  updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostRequestDto,
  ): Promise<UpdatePostResponseDto> {
    return this.noticeBoardService.updatePost(id, body);
  }

  @Delete('delete/:id')
  deletePost(
    @Param('id') id: string,
    @Body() body: DeletePostRequestDto,
  ): Promise<DeletePostResponseDto> {
    return this.noticeBoardService.deletePost(id, body);
  }
}
