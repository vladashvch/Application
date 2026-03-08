import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ERROR_MESSAGES } from '../../common/error-messages';
import { CreateEventDto, EventResponseDto, UpdateEventDto } from './dto';
import { EventValidator } from './helpers/event-validator';
import { EventRow } from './types';
import { EVENT_SELECT } from './helpers/event-select';
import { SuccessResponseDto } from 'src/common/dto';

@Injectable()
export class EventsService {
  constructor(private readonly database: DatabaseService) {}

  async findAll(userId: string): Promise<EventResponseDto[]> {
    const events = await this.database.event.findMany({
      where: { isPublic: true },
      select: EVENT_SELECT(userId),
      orderBy: { date: 'asc' },
    });

    return events.map((event) => this.toEventResponse(event, userId));
  }

  async findOne(id: string, userId: string): Promise<EventResponseDto> {
    const event = await this.database.event.findFirst({
      where: {
        id,
        OR: [{ isPublic: true }, { organizerId: userId }],
      },
      select: EVENT_SELECT(userId),
    });

    if (!event) throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);

    return this.toEventResponse(event, userId);
  }

  async create(userId: string, dto: CreateEventDto): Promise<EventResponseDto> {
    const event = await this.database.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(dto.date),
        location: dto.location,
        capacity: dto.capacity ?? null,
        isPublic: dto.isPublic ?? true,
        organizerId: userId,
      },
      select: EVENT_SELECT(userId),
    });

    return this.toEventResponse(event, userId);
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateEventDto,
  ): Promise<EventResponseDto> {
    const event = await EventValidator.findEventOrFail(id, this.database);
    EventValidator.assertIsOrganizer(event.organizerId, userId);

    const updated = await this.database.event.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.date !== undefined && { date: new Date(dto.date) }),
        ...(dto.location !== undefined && { location: dto.location }),
        ...(dto.capacity !== undefined && { capacity: dto.capacity }),
        ...(dto.isPublic !== undefined && { isPublic: dto.isPublic }),
      },
      select: EVENT_SELECT(userId),
    });

    return this.toEventResponse(updated, userId);
  }

  async remove(id: string, userId: string): Promise<SuccessResponseDto> {
    const event = await EventValidator.findEventOrFail(id, this.database);
    EventValidator.assertIsOrganizer(event.organizerId, userId);

    await this.database.event.delete({ where: { id } });

    return { success: true };
  }

  async join(id: string, userId: string): Promise<SuccessResponseDto> {
    const event = await EventValidator.findEventOrFail(id, this.database);

    await EventValidator.assertNotOrganizer(userId, id, this.database);
    await EventValidator.assertNotAlreadyJoined(userId, id, this.database);
    await EventValidator.assertCapacityAvailable(
      id,
      event.capacity,
      this.database,
    );

    await this.database.participant.create({ data: { userId, eventId: id } });

    return { success: true };
  }

  async leave(id: string, userId: string): Promise<SuccessResponseDto> {
    await EventValidator.findEventOrFail(id, this.database);
    await EventValidator.assertIsParticipant(userId, id, this.database);

    await this.database.participant.delete({
      where: { userId_eventId: { userId, eventId: id } },
    });

    return { success: true };
  }

  private toEventResponse(event: EventRow, userId: string): EventResponseDto {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
      isPublic: event.isPublic,
      createdAt: event.createdAt,
      organizer: event.organizer.name,
      participantCount: event._count.participants,
      isOrganizer: event.organizerId === userId,
      isParticipant: event.participants.length > 0,
    };
  }
}
