import { object, string } from 'yup';

export const userEventsQuerySchema = object({
  view: string().oneOf(['monthly', 'weekly']).required(),
  date: string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'date must be in YYYY-MM-DD format')
    .optional(),
});
