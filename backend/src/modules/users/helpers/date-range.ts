import { UserEventsDto } from '../dto';

export function resolveDateRange(query: UserEventsDto): {
  startDate: Date;
  endDate: Date;
} {
  const ref = query.date ? new Date(query.date) : new Date();

  if (query.view === 'monthly') {
    return {
      startDate: new Date(ref.getFullYear(), ref.getMonth(), 1, 0, 0, 0, 0),
      endDate: new Date(
        ref.getFullYear(),
        ref.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      ),
    };
  }

  const dayOfWeek = ref.getDay(); // 0 = Sun
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const startDate = new Date(ref);
  startDate.setDate(ref.getDate() + diffToMonday);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}
