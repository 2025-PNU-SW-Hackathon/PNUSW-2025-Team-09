import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBoardPost } from '@/entity/notice-board-post.entity';
import { User } from '@/entity/user.entity';
import { Comment } from '@/entity/comment.entity';
import { CommentService } from '@/service/comment.service';
import { CommentController } from '@/controller/comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBoardPost, Comment, User])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
