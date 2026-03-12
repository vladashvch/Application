import { object } from 'yup';
import { authFields } from './auth-fields';

export const loginSchema = object(authFields);
