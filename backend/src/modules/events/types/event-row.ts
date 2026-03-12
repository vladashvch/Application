export type EventRow = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number | null;
  isPublic: boolean;
  createdAt: Date;
  organizerId: string;
  organizer: { id: string; name: string };
  _count: { participants: number };
  participants: { user: { id: string; name: string } }[];
};
