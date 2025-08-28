import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeBoardController } from '@/controller/notice-board.controller';
import { NoticeBoardService } from '@/service/notice-board.service';
import { NoticeBoardPost } from '@/entity/notice-board-post.entity';
import { User } from '@/entity/user.entity';
import { Comment } from '@/entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeBoardPost, Comment, User])],
  controllers: [NoticeBoardController],
  providers: [NoticeBoardService],
})
export class NoticeBoardModule {}
