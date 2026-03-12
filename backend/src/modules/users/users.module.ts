import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
