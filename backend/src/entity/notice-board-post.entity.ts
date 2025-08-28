import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  VersionColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class NoticeBoardPost {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'board_type' })
  boardType: string;

  @Column({ name: 'class_type' })
  classType: string;

  @Column({ name: 'content_type' })
  contentType: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'author' })
  author: User;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'content' })
  content: string;

  @OneToMany(() => Comment, (commnet) => commnet.post)
  comments: Comment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @VersionColumn()
  version: number;
}
