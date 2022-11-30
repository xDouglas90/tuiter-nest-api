import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tuit } from 'src/tuits/entities/tuit.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Tuit)
    private tuitsRepository: Repository<Tuit>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const created = this.usersRepository.create(createUserDto);

        const saved: User = await this.usersRepository.save(created);

        resolve(saved);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<User>> {
    return new Promise(async (resolve, reject) => {
      try {
        const queryBuilder = this.usersRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect('user.tuits', 'tuit')
          .orderBy('user.id', 'DESC');

        const result = await paginate<User>(queryBuilder, options);

        resolve(result);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findAllTuitsByUserName(
    username: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Tuit>> {
    return new Promise(async (resolve, reject) => {
      try {
        const queryBuilder = this.tuitsRepository
          .createQueryBuilder('tuit')
          .leftJoinAndSelect('tuit.user', 'user')
          .where('user.username = :username', { username })
          .orderBy('tuit.id', 'DESC');

        const result = await paginate<Tuit>(queryBuilder, options);

        resolve(result);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async findOneByUserName(username: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.usersRepository.findOne({
          where: { username },
        });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'User not found',
          });
        }
        resolve(found);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async updateUser(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.usersRepository.findOne({
          where: { username },
        });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'User not found',
          });
        }

        await this.usersRepository.update(found.id, updateUserDto);

        const saved = await this.usersRepository.findOne({
          where: { username },
        });

        resolve(saved);
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }

  async removeUser(username: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const found = await this.usersRepository.findOne({
          where: { username },
        });
        if (!found) {
          reject({
            code: HttpStatus.NOT_FOUND,
            detail: 'User not found',
          });
        }

        await this.usersRepository.delete(found.id);

        resolve({
          code: HttpStatus.NO_CONTENT,
          detail: 'User deleted',
        });
      } catch (error) {
        reject({
          code: error.code,
          detail: error.detail,
        });
      }
    });
  }
}
