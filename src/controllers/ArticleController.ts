import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';

import type {
  IAuthDTO,
  ICreateArticleRequest,
  IGetArticleRequest,
  IGetAllArticleRequest,
  IGetArticlesByUserIdRequest,
  IDeleteArticleRequest,
  IUpdateArticleRequest,
} from '../dtos';
import { ArticleService } from '../services';
import { SharpUtils } from '../utils';
import { successResponse } from '../utils/api-response';

export class ArticleController {
  static async create(
    req: IAuthDTO,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    let newFilePath;

    try {
      if (req.file) {
        newFilePath = await SharpUtils.resizeImage(req.file.path);
      }

      const request = {
        userId: req.user.userId,
        ...req.body,
        image: req.file ? newFilePath : null,
      } as ICreateArticleRequest;

      const response = await ArticleService.create(request);

      successResponse(res, 201, 'Sukses menambahkan artikel', response);
    } catch (error) {
      if (newFilePath) {
        fs.unlinkSync(newFilePath);
      }

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
        id: req.params.id as string,
      } as IGetArticleRequest;

      const response = await ArticleService.get(request);
      successResponse(res, 200, 'Sukses mendapatkan artikel', response);
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
        page: req.query.page ? Number(req.query.page) : null,
        limit: req.query.limit ? Number(req.query.limit) : null,
      } as IGetAllArticleRequest;

      const response = await ArticleService.getAll(request);

      if (response.articles.length === 0) {
        successResponse(res, 200, 'Belum ada artikel');

        return;
      }

      successResponse(res, 200, 'Sukses mendapatkan semua artikel', response);
    } catch (error) {
      next(error);
    }
  }

  static async getArticlesByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const request = {
        userId: req.params.userId as string,
        search: req.query.search ? String(req.query.search) : null,
        page: req.query.page ? Number(req.query.page) : null,
        limit: req.query.limit ? Number(req.query.limit) : null,
      } as IGetArticlesByUserIdRequest;

      const response = await ArticleService.getArticlesByUserId(request);

      if (response.articles.length === 0) {
        successResponse(res, 200, 'Belum ada artikel');

        return;
      }

      successResponse(
        res,
        200,
        'Sukses mendapatkan semua artikel dari user',
        response,
      );
    } catch (error) {
      next(error);
    }
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    let newFilePath;

    try {
      if (req.file) {
        newFilePath = await SharpUtils.resizeImage(req.file.path);
      }

      const request = {
        id: req.params.id as string,
        ...req.body,
        image: req.file ? newFilePath : null,
      } as IUpdateArticleRequest;

      const response = await ArticleService.update(request);

      successResponse(res, 200, 'Sukses mengupdate artikel', response);
    } catch (error) {
      if (newFilePath) {
        fs.unlinkSync(newFilePath);
      }

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
        id: req.params.id as string,
      } as IDeleteArticleRequest;

      await ArticleService.delete(request);
      successResponse(res, 200, 'Sukses menghapus artikel');
    } catch (error) {
      next(error);
    }
  }
}
