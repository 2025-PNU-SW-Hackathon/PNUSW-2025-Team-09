import { CreateCommentRequestDto } from '@/dto/comment/create-comment-request.dto';
import { CreateCommentResponseDto } from '@/dto/comment/create-comment-response.dto';
import { DeleteCommentRequestDto } from '@/dto/comment/delete-comment-request.dto';
import { DeleteCommentResponseDto } from '@/dto/comment/delete-comment-response.dto';
import { UpdateCommentRequestDto } from '@/dto/comment/update-comment-request.dto';
import { UpdateCommentResponseDto } from '@/dto/comment/update-comment-response.dto';
import { Comment } from '@/entity/comment.entity';
import { NoticeBoardPost } from '@/entity/notice-board-post.entity';
import { User } from '@/entity/user.entity';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(NoticeBoardPost)
    private readonly postRepo: Repository<NoticeBoardPost>,

    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createComment(
    body: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    const post = await this.postRepo.findOne({
      where: {
        id: body.postId,
      },
      relations: {
        author: true,
      },
    });
    if (!post) {
      throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');
    }

    const author = await this.userRepo.findOneBy({
      nickname: body.authorNickname,
    });
    if (!author) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const parent = body.parentId
      ? await this.commentRepo.findOneBy({ id: body.parentId })
      : null;
    if (body.parentId && !parent) {
      throw new NotFoundException('부모 댓글을 찾을 수 없습니다.');
    }

    const children = parent ? null : [];

    const comment = this.commentRepo.create({
      post,
      author,
      parent,
      children,
      content: body.content,
    });

    const result = await this.commentRepo.save(comment);

    return {
      id: result.id,
      author: {
        id: result.author.id,
        nickname: result.author.nickname,
      },
      content: result.content,
      parent: result.parent?.id ?? null,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async updateComment(
    commentId: string,
    body: UpdateCommentRequestDto,
  ): Promise<UpdateCommentResponseDto> {
    const prevComment = await this.commentRepo.findOne({
      where: {
        id: commentId,
      },
      relations: {
        author: true,
        parent: true,
        children: {
          author: true,
        },
      },
    });

    if (!prevComment)
      throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');

    if (prevComment.author.nickname !== body.authorNickname)
      throw new ForbiddenException('본인 댓글만 수정할 수 있습니다.');

    if (body.content !== undefined) prevComment.content = body.content;

    try {
      const updatedComment = await this.commentRepo.save(prevComment);

      const children = updatedComment.parent?.id
        ? null
        : (updatedComment.children?.map((child) => {
            return {
              id: child.id,
              author: {
                id: child.author.id,
                nickname: child.author.nickname,
              },
              content: child.content,
              parent: updatedComment.id,
              children: null,
              createdAt: child.createdAt,
              updatedAt: child.updatedAt,
            };
          }) ?? []);

      return {
        success: true,
        updatedComment: {
          id: updatedComment.id,
          author: {
            id: updatedComment.author.id,
            nickname: updatedComment.author.nickname,
          },
          content: updatedComment.content,
          parent: updatedComment.parent?.id ?? null,
          children: children,
          createdAt: updatedComment.createdAt,
          updatedAt: updatedComment.updatedAt,
        },
      };
    } catch (error) {
      const latestComment = await this.commentRepo.findOne({
        where: {
          id: commentId,
        },
        relations: {
          parent: true,
          children: {
            author: true,
          },
        },
      });

      if (!latestComment)
        throw new NotFoundException('해당 게시글을 찾을 수 없습니다.');

      const children = latestComment.parent?.id
        ? (latestComment.children?.map((child) => {
            return {
              id: child.id,
              author: {
                id: child.author.id,
                nickname: child.author.nickname,
              },
              content: child.content,
              parent: latestComment.id,
              children: null,
              createdAt: child.createdAt,
              updatedAt: child.updatedAt,
            };
          }) ?? null)
        : null;

      return {
        success: true,
        latestComment: {
          id: latestComment.id,
          author: {
            id: latestComment.author.id,
            nickname: latestComment.author.nickname,
          },
          content: latestComment.content,
          parent: latestComment.parent?.id ?? null,
          children: children,
          createdAt: latestComment.createdAt,
          updatedAt: latestComment.updatedAt,
        },
        error: '수정 중 오류가 발생했습니다.',
      };
    }
  }

  async deleteComment(
    commentId: string,
    body: DeleteCommentRequestDto,
  ): Promise<DeleteCommentResponseDto> {
    const comment = await this.commentRepo.findOne({
      where: {
        id: commentId,
      },
      relations: {
        author: true,
      },
    });

    if (!comment) throw new NotFoundException('해당 댓글을 찾을 수 없습니다.');

    if (comment.author.nickname !== body.authorNickname)
      throw new ForbiddenException('본인 댓글만 삭제할 수 있습니다.');

    await this.commentRepo.remove(comment);

    return { success: true, message: '해당 댓글을 삭제했습니다.' };
  }
}
