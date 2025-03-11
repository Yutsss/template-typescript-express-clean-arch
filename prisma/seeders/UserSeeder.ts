import '../../src/configs/env';
import { PrismaClient } from '@prisma/client';
import { PasswordUtils } from '../../src/utils/password-utils';

const prisma = new PrismaClient();

export const userSeeder = async () => {
  const adminUsername = process.env.ADMIN_USERNAME as string;
  const adminEmail = process.env.ADMIN_EMAIL as string;
  const adminPlainPassword = process.env.ADMIN_PASSWORD as string;

  const adminPassword = await PasswordUtils.hashPassword(adminPlainPassword);
  await prisma.user.createMany({
    data: [
      {
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
        role: 'Admin',
      },
    ],
  });
};
