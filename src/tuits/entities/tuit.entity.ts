import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tuits', { schema: 'exercise' })
export class Tuit {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: new Date(),
  })
  createdAt: Date;

  @Column('timestamp', {
    name: 'removed_at',
    nullable: true,
    default: null,
  })
  removedAt: Date | null;

  @Column('varchar', {
    name: 'content',
    length: 140,
  })
  content: string;

  @Column('int', {
    name: 'likes',
    default: 0,
  })
  likes: number;

  @Column('int', {
    name: 'retuits',
    default: 0,
  })
  retuits: number;

  @ManyToOne(() => User, (user) => user.tuits, {
    cascade: true,
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
