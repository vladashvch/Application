import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [DatabaseModule, JwtModule.register({})],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
