import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NoticeBoardPost } from './notice-board-post.entity';
import { Comment } from './comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'age' })
  age: number;

  @Column({
    name: 'nickname',
    unique: true,
  })
  nickname: string;

  @OneToMany(() => NoticeBoardPost, (post) => post.author)
  posts: NoticeBoardPost[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
