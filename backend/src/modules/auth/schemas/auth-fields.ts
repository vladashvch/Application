import { string } from 'yup';

export const authFields = {
  email: string().email().required(),
  password: string().min(6).max(20).required(),
};
