import { Tuit } from 'src/tuits/entities/tuit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users', { schema: 'exercise' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    name: 'email',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    name: 'password',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column('varchar', {
    name: 'username',
    length: 100,
    nullable: false,
  })
  username: string;

  @Column('varchar', {
    name: 'avatar',
    length: 100,
    nullable: true,
    default: null,
  })
  avatar: string | null;

  @Column('varchar', {
    name: 'bio',
    length: 100,
    nullable: true,
    default: null,
  })
  bio: string | null;

  @Column('varchar', {
    name: 'location',
    length: 100,
    nullable: true,
    default: null,
  })
  location: string | null;

  @Column('varchar', {
    name: 'website',
    length: 100,
    nullable: true,
    default: null,
  })
  website: string | null;

  @Column('varchar', {
    name: 'birth_date',
    nullable: false,
  })
  birthdate: string;

  @Column('varchar', {
    name: 'cover',
    length: 100,
    nullable: true,
    default: null,
  })
  cover: string | null;

  @Column('varchar', {
    name: 'phone',
    length: 100,
    nullable: true,
  })
  phone: string;

  @Column('boolean', {
    name: 'is_verified',
    default: false,
  })
  isVerified: boolean;

  @Column('boolean', {
    name: 'is_private',
    default: false,
  })
  isPrivate: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: new Date(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    default: new Date(),
  })
  updatedAt: Date;

  @OneToMany(() => Tuit, (tuits) => tuits.user)
  tuits: Tuit[];
}
