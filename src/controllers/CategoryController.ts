import type { Request, Response, NextFunction } from 'express';

import type {
  ICreateCategoryRequest,
  IGetCategoryRequest,
  IUpdateCategoryRequest,
  IDeleteCategoryRequest,
  IGetAllCategoryRequest,
} from '../dtos';
import { CategoryService } from '../services';
import { successResponse } from '../utils/api-response';

export class CategoryController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = req.body as ICreateCategoryRequest;
      const response = await CategoryService.create(request);

      successResponse(res, 201, 'Sukses menambahkan kategori', response);
    } catch (error) {
      next(error);
    }
  }

  static async get(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        categoryId: req.params.categoryId,
      } as IGetCategoryRequest;
      const response = await CategoryService.get(request);

      successResponse(res, 200, 'Sukses mendapatkan kategori', response);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        search: req.query.search ? String(req.query.search) : null,
        page: Number(req.query.page) || null,
        limit: Number(req.query.limit) || null,
      } as IGetAllCategoryRequest;

      const response = await CategoryService.getAll(request);

      if (response.categories.length === 0) {
        successResponse(res, 200, 'Belum ada kategori');

        return;
      }

      successResponse(res, 200, 'Sukses mendapatkan semua kategori', response);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        categoryId: req.params.categoryId,
        name: req.body.name,
      } as IUpdateCategoryRequest;
      const response = await CategoryService.update(request);

      successResponse(res, 200, 'Sukses mengupdate kategori', response);
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        categoryId: req.params.categoryId,
      } as IDeleteCategoryRequest;
      await CategoryService.delete(request);

      successResponse(res, 200, 'Sukses menghapus kategori');
    } catch (error) {
      next(error);
    }
  }
}
