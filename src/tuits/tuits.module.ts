import { Module } from '@nestjs/common';
import { TuitsService } from './tuits.service';
import { TuitsController } from './tuits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tuit } from './entities/tuit.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tuit]), TypeOrmModule.forFeature([User])],
  controllers: [TuitsController],
  providers: [TuitsService],
})
export class TuitsModule {}
