import { boolean, number, object, string } from 'yup';

export const createEventSchema = object({
  title: string().min(2).max(100).required(),
  description: string().min(2).required(),
  date: string()
    .matches(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/,
      'date must be an ISO 8601 datetime',
    )
    .required(),
  location: string().min(2).required(),
  capacity: number().integer().min(1).nullable().optional(),
  isPublic: boolean().optional(),
});
