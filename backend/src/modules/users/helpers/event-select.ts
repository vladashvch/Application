export const EVENT_SELECT = {
  id: true,
  title: true,
  date: true,
  description: true,
  location: true,
  capacity: true,
  organizer: { select: { name: true } },
} as const;
