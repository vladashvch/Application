export const EVENT_SELECT = () =>
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
      select: { user: { select: { id: true, name: true } } },
    },
  }) as const;
