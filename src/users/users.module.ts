import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tuit } from 'src/tuits/entities/tuit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Tuit])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
