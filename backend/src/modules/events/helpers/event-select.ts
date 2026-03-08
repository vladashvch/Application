export const EVENT_SELECT = (userId: string) =>
  ({
    id: true,
    title: true,
    description: true,
    date: true,
    location: true,
    capacity: true,
    isPublic: true,
    createdAt: true,
    organizerId: true,
    organizer: { select: { id: true, name: true } },
    _count: { select: { participants: true } },
    participants: {
      where: { userId },
      select: { id: true },
    },
  }) as const;
