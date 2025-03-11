import '../../src/configs/env';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const articleSeeder = async () => {
  const adminUsername = process.env.ADMIN_USERNAME as string;
  const adminSample = await prisma.user.findFirst({
    where: { username: adminUsername },
  });

  const categorySample = await prisma.category.findFirst({
    where: { name: 'Project1' },
  });

  await prisma.article.createMany({
    data: [
      {
        title: 'Artikel Project 1',
        content: 'Content Project 1',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
      {
        title: 'Artikel Project 2',
        content: 'Content Project 2',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
      {
        title: 'Artikel Project 3',
        content: 'Content Project 3',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
      {
        title: 'Artikel Project 4',
        content: 'Content Project 4',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
      {
        title: 'Artikel Project 5',
        content: 'Content Project 5',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
      {
        title: 'Artikel Project 6',
        content: 'Content Project 6',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
      {
        title: 'Artikel Project 7',
        content: 'Content Project 7',
        userId: adminSample?.id,
        categoryId: categorySample!.id,
      },
    ],
  });
};
