import { Module } from '@nestjs/common';
import { TuitsModule } from './tuits/tuits.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TuitsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
