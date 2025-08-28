import { CreateCommentRequestDto } from '@/dto/comment/create-comment-request.dto';
import { CreateCommentResponseDto } from '@/dto/comment/create-comment-response.dto';
import { DeleteCommentRequestDto } from '@/dto/comment/delete-comment-request.dto';
import { DeleteCommentResponseDto } from '@/dto/comment/delete-comment-response.dto';
import { UpdateCommentRequestDto } from '@/dto/comment/update-comment-request.dto';
import { UpdateCommentResponseDto } from '@/dto/comment/update-comment-response.dto';
import { CommentService } from '@/service/comment.service';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('post')
  createComment(
    @Body() body: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    return this.commentService.createComment(body);
  }

  @Patch('patch/:id')
  updateComment(
    @Param('id') id: string,
    @Body() body: UpdateCommentRequestDto,
  ): Promise<UpdateCommentResponseDto> {
    return this.commentService.updateComment(id, body);
  }

  @Delete('delete/:id')
  deleteComment(
    @Param('id') id: string,
    @Body() body: DeleteCommentRequestDto,
  ): Promise<DeleteCommentResponseDto> {
    return this.commentService.deleteComment(id, body);
  }
}
