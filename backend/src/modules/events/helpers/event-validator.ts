import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ERROR_MESSAGES } from '../../../common/error-messages';

export class EventValidator {
  static async findEventOrFail(id: string, database: DatabaseService) {
    const event = await database.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    return event;
  }

  static assertIsOrganizer(organizerId: string, userId: string): void {
    if (organizerId !== userId)
      throw new ForbiddenException(ERROR_MESSAGES.FORBIDDEN);
  }

  static async assertNotOrganizer(
    userId: string,
    eventId: string,
    database: DatabaseService,
  ): Promise<void> {
    const event = await database.event.findUnique({
      where: { id: eventId },
      select: { organizerId: true },
    });
    if (!event) throw new NotFoundException(ERROR_MESSAGES.NOT_FOUND);
    if (event.organizerId === userId)
      throw new ConflictException(ERROR_MESSAGES.CANNOT_JOIN_OWN_EVENT);
  }

  static async assertNotAlreadyJoined(
    userId: string,
    eventId: string,
    database: DatabaseService,
  ): Promise<void> {
    const existing = await database.participant.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
    if (existing) throw new ConflictException(ERROR_MESSAGES.ALREADY_JOINED);
  }

  static async assertIsParticipant(
    userId: string,
    eventId: string,
    database: DatabaseService,
  ): Promise<void> {
    const existing = await database.participant.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });
    if (!existing)
      throw new NotFoundException(ERROR_MESSAGES.NOT_A_PARTICIPANT);
  }

  static async assertCapacityAvailable(
    eventId: string,
    capacity: number | null,
    database: DatabaseService,
  ): Promise<void> {
    if (capacity === null) return;
    const count = await database.participant.count({ where: { eventId } });
    if (count >= capacity)
      throw new ConflictException(ERROR_MESSAGES.EVENT_FULL);
  }
}
