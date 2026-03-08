import { boolean, number, object, string } from 'yup';

export const updateEventSchema = object({
  title: string().min(2).max(100).optional(),
  description: string().min(2).optional(),
  date: string()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/,
      'date must be an ISO 8601 datetime',
    )
    .optional(),
  location: string().min(2).optional(),
  capacity: number().integer().min(1).nullable().optional(),
  isPublic: boolean().optional(),
});
