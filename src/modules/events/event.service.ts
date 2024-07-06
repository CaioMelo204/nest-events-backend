import { Injectable, Logger } from '@nestjs/common';
import { Event } from './entity/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { User } from '../auth/entity/user.entity';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);

  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  async findAll() {
    this.logger.log('Hit the find All method');
    const event = await this.repository.find();
    this.logger.debug(`Found ${event.length}`);
    return event;
  }

  async findOne(id: string) {
    return await this.repository.findOneBy({
      id,
    });
  }

  async create(event: CreateEventDto, user: User) {
    return await this.repository.save({
      ...event,
      organizer: user.id,
    });
  }

  async update(id: string, event: UpdateEventDto) {
    const found = await this.findOne(id);

    if (!found) {
      throw new Error('Event not found');
    }

    return await this.repository.save({
      ...found,
      ...event,
    });
  }

  async delete(id: string): Promise<void> {
    const found = await this.findOne(id);

    if (!found) {
      throw new Error('Event not found');
    }

    await this.repository.delete({
      id,
    });
  }
}
