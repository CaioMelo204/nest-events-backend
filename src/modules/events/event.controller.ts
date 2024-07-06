import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateEventDto) {
    return this.eventService.create(payload);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() payload: UpdateEventDto) {
    return this.eventService.update(id, payload);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
}
