import { object, string } from 'yup';
import { authFields } from './auth-fields';

export const registerSchema = object({
  ...authFields,
  name: string().min(2).required(),
});
