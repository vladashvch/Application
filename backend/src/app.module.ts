import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';

@Module({
  imports: [AuthModule, UsersModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
