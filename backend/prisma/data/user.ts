import * as bcrypt from 'bcrypt';

const hash = 10;

export const getUsers = async () => [
  {
    id: '1',
    email: 'user1@example.com',
    password: await bcrypt.hash('password123', hash),
    name: 'Alice Johnson',
  },
  {
    id: '2',
    email: 'user2@example.com',
    password: await bcrypt.hash('password123', hash),
    name: 'Bob',
  },
  {
    id: '3',
    email: 'user3@example.com',
    password: await bcrypt.hash('password123', hash),
    name: 'Carol',
  },
];
