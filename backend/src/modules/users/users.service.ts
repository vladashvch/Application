import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { UserEventsDto, UserEventResponse } from './dto';
import { EventRow } from './types';
import { EVENT_SELECT, resolveDateRange } from './helpers';

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async getMyEvents(
    userId: string,
    query: UserEventsDto,
  ): Promise<UserEventResponse[]> {
    const { startDate, endDate } = resolveDateRange(query);
    const dateFilter = { gte: startDate, lte: endDate };

    const user = await this.database.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        organizedEvents: {
          where: { date: dateFilter },
          select: EVENT_SELECT,
        },
        participation: {
          where: { event: { date: dateFilter } },
          select: { event: { select: EVENT_SELECT } },
        },
      },
    });

    if (!user) return [];

    return this.mergeAndSort(user);
  }

  private mergeAndSort(user: {
    name: string;
    organizedEvents: EventRow[];
    participation: { event: EventRow }[];
  }) {
    const map = new Map<string, UserEventResponse>();

    for (const ev of user.organizedEvents) {
      map.set(ev.id, this.toEventResponse(ev, true, user.name));
    }

    for (const { event: ev } of user.participation) {
      if (!map.has(ev.id)) {
        map.set(ev.id, this.toEventResponse(ev, false));
      }
    }

    return Array.from(map.values()).sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );
  }

  private toEventResponse(
    ev: EventRow,
    isOrganizer: boolean,
    fallbackOrganizerName?: string,
  ): UserEventResponse {
    return {
      id: ev.id,
      title: ev.title,
      date: ev.date,
      description: ev.description,
      location: ev.location,
      capacity: ev.capacity ?? null,
      organizer_name: ev.organizer.name ?? fallbackOrganizerName ?? null,
      isOrganizer,
    };
  }
}
