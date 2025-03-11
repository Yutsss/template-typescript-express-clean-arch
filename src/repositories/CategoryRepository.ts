import type { Prisma } from '@prisma/client';

import { db } from '../configs/database';

export class CategoryRepository {
  static async create(
    data: Prisma.CategoryCreateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return await tx.category.create({ data });
  }

  static async findById(categoryId: string, tx: Prisma.TransactionClient = db) {
    return await tx.category.findUnique({ where: { id: categoryId } });
  }

  static async findByName(name: string, tx: Prisma.TransactionClient = db) {
    return await tx.category.findFirst({ where: { name } });
  }

  static async findAll(search?: string, tx: Prisma.TransactionClient = db) {
    const searchCondition = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        }
      : {};

    return await tx.category.findMany({
      where: {
        ...searchCondition,
      },
      orderBy: { name: 'asc' },
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
          name: {
            contains: search,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        }
      : {};

    return await tx.category.findMany({
      where: {
        ...searchCondition,
      },
      skip,
      take,
      orderBy: { name: 'asc' },
    });
  }

  static async count(search?: string, tx: Prisma.TransactionClient = db) {
    const searchCondition = search
      ? {
          name: {
            contains: search,
            mode: 'insensitive' as Prisma.QueryMode,
          },
        }
      : {};

    return await tx.category.count({
      where: {
        ...searchCondition,
      },
    });
  }

  static async update(
    categoryId: string,
    data: Prisma.CategoryUpdateInput,
    tx: Prisma.TransactionClient = db,
  ) {
    return await tx.category.update({ where: { id: categoryId }, data });
  }

  static async delete(categoryId: string, tx: Prisma.TransactionClient = db) {
    return await tx.category.delete({ where: { id: categoryId } });
  }
}
