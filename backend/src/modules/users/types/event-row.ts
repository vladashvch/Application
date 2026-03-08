export type EventRow = {
  id: string;
  title: string;
  date: Date;
  description: string;
  location: string;
  capacity: number | null;
  organizer: { name: string };
};
