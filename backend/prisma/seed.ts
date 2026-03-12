import { PrismaClient } from '@prisma/client';
import { getUsers } from './data/user';
import { events } from './data/event';
import { participants } from './data/participant';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  await prisma.participant.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  const users = await getUsers();

  await prisma.user.createMany({ data: users });
  console.log(`Created ${users.length} users`);

  await prisma.event.createMany({ data: events });
  console.log(`Created ${events.length} events`);

  await prisma.participant.createMany({ data: participants });
  console.log(`Created ${participants.length} participants`);

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
