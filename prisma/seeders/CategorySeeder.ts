import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categorySeeder = async () => {
  await prisma.category.createMany({
    data: [
      { name: 'Akademik4' },
      { name: 'Akademik5' },
      { name: 'Akademik6' },
      { name: 'Akademik7' },
      { name: 'Akademik8' },
      { name: 'Akademik9' },
      { name: 'Akademik10' },
      { name: 'Project1' },
      { name: 'Project2' },
      { name: 'Project3' },
      { name: 'Project4' },
      { name: 'Project5' },
      { name: 'Project6' },
      { name: 'Project7' },
      { name: 'Project8' },
      { name: 'Project9' },
      { name: 'Project10' },
    ],
  });
};
