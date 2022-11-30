import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException({ message: error.detail }, HttpStatus.CONFLICT);
      }

      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<User>> {
    try {
      const options: IPaginationOptions = {
        page,
        limit,
      };

      return this.usersService.findAll(options);
    } catch (error) {
      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':username/tuits')
  async findAllTuitsByUserName(
    @Param('username') username: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    try {
      const options: IPaginationOptions = {
        page,
        limit,
      };

      return this.usersService.findAllTuitsByUserName(username, options);
    } catch (error) {
      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':username')
  async findOneByUserName(@Param('username') username: string): Promise<User> {
    try {
      return this.usersService.findOneByUserName(username);
    } catch (error) {
      if (error.code === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          { message: error.detail },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':username')
  async updateUser(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return this.usersService.updateUser(username, updateUserDto);
    } catch (error) {
      if (error.code === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          { message: error.detail },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':username')
  async removeUser(@Param('username') username: string) {
    try {
      return this.usersService.removeUser(username);
    } catch (error) {
      if (error.code === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          { message: error.detail },
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        { message: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
