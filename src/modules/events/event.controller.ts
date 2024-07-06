import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { User } from '../auth/entity/user.entity';
import { AuthGuardJwt } from '../auth/guard/auth-guard.jwt';

@Controller('/events')
@UseGuards(AuthGuardJwt)
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
  create(@Body() payload: CreateEventDto, @CurrentUser() user: User) {
    return this.eventService.create(payload, user);
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
