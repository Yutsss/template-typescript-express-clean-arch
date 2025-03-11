import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

export class ArticleRepository {
  static async create(
    data: Prisma.ArticleCreateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return await tx.article.create({ data });
  }

  static async findByTitle(title: string, tx: Prisma.TransactionClient = db) {
    return await tx.article.findFirst({ where: { title } });
  }

  static async findById(id: string, tx: Prisma.TransactionClient = db) {
    return await tx.article.findFirst({
      where: { id },
      include: { category: true },
    });
  }

  static async findAllWithPagination(
    skip: number,
    take: number,
    search?: string,
    tx: Prisma.TransactionClient = db,
  ) {
    const searchCondition = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              content: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    return await tx.article.findMany({
      where: {
        ...searchCondition,
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  static async findAll(search?: string, tx: Prisma.TransactionClient = db) {
    const searchCondition = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              content: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    return await tx.article.findMany({
      where: {
        ...searchCondition,
      },
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  static async findByUserIdWithPagination(
    userId: string,
    skip: number,
    take: number,
    search?: string,
    tx: Prisma.TransactionClient = db,
  ) {
    const searchCondition = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              content: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    return await tx.article.findMany({
      where: {
        userId,
        ...searchCondition,
      },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  static async findByUserId(
    userId: string,
    search?: string,
    tx: Prisma.TransactionClient = db,
  ) {
    const searchCondition = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              content: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    return await tx.article.findMany({
      where: { userId, ...searchCondition },
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
  }

  static async countByUserId(
    userId: string,
    search?: string,
    tx: Prisma.TransactionClient = db,
  ) {
    const searchCondition = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              content: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    return await tx.article.count({ where: { userId, ...searchCondition } });
  }

  static async count(search?: string, tx: Prisma.TransactionClient = db) {
    const searchCondition = search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
            {
              content: {
                contains: search,
                mode: 'insensitive' as Prisma.QueryMode,
              },
            },
          ],
        }
      : {};

    return await tx.article.count({ where: { ...searchCondition } });
  }

  static async delete(id: string, tx: Prisma.TransactionClient = db) {
    return await tx.article.delete({ where: { id } });
  }

  static async update(
    id: string,
    data: Prisma.ArticleUpdateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return await tx.article.update({ where: { id }, data });
  }
}
