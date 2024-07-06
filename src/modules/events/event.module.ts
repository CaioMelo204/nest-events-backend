import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Module } from '@nestjs/common';
import { Event } from './entity/event.entity';
import { Attendee } from './entity/attendee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
