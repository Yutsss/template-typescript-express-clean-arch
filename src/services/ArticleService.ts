import fs from 'fs';
import { StatusCodes } from 'http-status-codes';

import type {
  ICreateArticleRequest,
  ICreateArticleResponse,
  IGetAllArticleRequest,
  IGetAllArticleResponse,
  IGetArticlesByUserIdRequest,
  IGetArticlesByUserIdResponse,
  IUpdateArticleRequest,
  IUpdateArticleResponse,
  IDeleteArticleRequest,
} from '../dtos';
import { ResponseError } from '../error/ResponseError';
import { ArticleRepository, CategoryRepository } from '../repositories';
import { Validator } from '../utils';
import { ArticleValidation } from '../validations';

export class ArticleService {
  static async create(
    request: ICreateArticleRequest,
  ): Promise<ICreateArticleResponse> {
    const validData = Validator.validate(ArticleValidation.CREATE, request);

    const existingArticle = await ArticleRepository.findByTitle(
      validData.title,
    );

    if (existingArticle) {
      throw new ResponseError(
        StatusCodes.BAD_REQUEST,
        'Judul artikel sudah ada',
      );
    }

    const categoryExists = await CategoryRepository.findById(
      validData.categoryId,
    );

    if (!categoryExists) {
      throw new ResponseError(
        StatusCodes.BAD_REQUEST,
        'Kategori tidak ditemukan',
      );
    }

    const newArticle = await ArticleRepository.create({
      title: validData.title,
      content: validData.content,
      user: { connect: { id: validData.userId } },
      category: { connect: { id: categoryExists.id } },
      image: validData.image ? validData.image : null,
    });

    return {
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      userId: newArticle.userId,
      image: newArticle.image,
      category: {
        id: categoryExists.id,
        name: categoryExists.name,
      },
      createdAt: newArticle.createdAt,
      updatedAt: newArticle.updatedAt,
    };
  }

  static async get(request: { id: string }): Promise<ICreateArticleResponse> {
    const validData = Validator.validate(ArticleValidation.GET, request);

    const article = await ArticleRepository.findById(validData.id);

    if (!article) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Artikel tidak ditemukan');
    }

    return {
      id: article.id,
      title: article.title,
      content: article.content,
      userId: article.userId,
      image: article.image,
      category: {
        id: article.category.id,
        name: article.category.name,
      },
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }

  static async getAll(
    request: IGetAllArticleRequest,
  ): Promise<IGetAllArticleResponse> {
    const validData = Validator.validate(ArticleValidation.GET_ALL, request);

    const take = validData.limit;
    const skip = (validData.page - 1) * take;
    const search = validData.search;

    if (!take || !validData.page) {
      const articles = await ArticleRepository.findAll(search);

      return {
        totalPage: 1,
        currentPage: 1,
        articles: articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          userId: article.userId,
          image: article.image,
          category: {
            id: article.category.id,
            name: article.category.name,
          },
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        })),
      };
    }

    const totalArticles = await ArticleRepository.count(search);

    if (totalArticles === 0) {
      return {
        totalPage: 1,
        currentPage: 1,
        articles: [],
      };
    }

    if (skip >= totalArticles) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Halaman tidak valid');
    }

    const articles = await ArticleRepository.findAllWithPagination(
      skip,
      take,
      search,
    );

    const totalPage = Math.ceil(totalArticles / take);
    const currentPage = Math.ceil(skip / take) + 1;

    return {
      totalPage,
      currentPage,
      articles: articles.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        userId: article.userId,
        image: article.image,
        category: {
          id: article.category.id,
          name: article.category.name,
        },
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
    };
  }

  static async getArticlesByUserId(
    request: IGetArticlesByUserIdRequest,
  ): Promise<IGetArticlesByUserIdResponse> {
    const validData = Validator.validate(
      ArticleValidation.GET_BY_USER_ID,
      request,
    );

    const take = validData.limit;
    const skip = (validData.page - 1) * take;
    const search = validData.search;

    if (!take || !validData.page) {
      const articles = await ArticleRepository.findByUserId(
        validData.userId,
        search,
      );

      return {
        totalPage: 1,
        currentPage: 1,
        articles: articles.map(article => ({
          id: article.id,
          title: article.title,
          content: article.content,
          userId: article.userId,
          image: article.image,
          category: {
            id: article.category.id,
            name: article.category.name,
          },
          createdAt: article.createdAt,
          updatedAt: article.updatedAt,
        })),
      };
    }

    const totalArticles = await ArticleRepository.countByUserId(
      validData.userId,
      search,
    );

    if (totalArticles === 0) {
      return {
        totalPage: 1,
        currentPage: 1,
        articles: [],
      };
    }

    if (skip >= totalArticles) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Halaman tidak valid');
    }

    const articles = await ArticleRepository.findByUserIdWithPagination(
      validData.userId,
      skip,
      take,
      search,
    );

    const totalPage = Math.ceil(totalArticles / take);
    const currentPage = Math.ceil(skip / take) + 1;

    return {
      totalPage,
      currentPage,
      articles: articles.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        userId: article.userId,
        image: article.image,
        category: {
          id: article.category.id,
          name: article.category.name,
        },
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
      })),
    };
  }

  static async update(
    request: IUpdateArticleRequest,
  ): Promise<IUpdateArticleResponse> {
    const validData = Validator.validate(ArticleValidation.UPDATE, request);

    const article = await ArticleRepository.findById(validData.id);

    if (!article) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Artikel tidak ditemukan');
    }

    const updateData: {
      title?: string;
      content?: string;
      categoryId?: string;
      image?: string;
    } = {};

    if (validData.title) {
      const existingArticle = await ArticleRepository.findByTitle(
        validData.title,
      );

      if (existingArticle) {
        if (existingArticle.id === validData.id) {
          throw new ResponseError(
            StatusCodes.BAD_REQUEST,
            'Judul tidak boleh sama',
          );
        }

        throw new ResponseError(
          StatusCodes.BAD_REQUEST,
          'Judul artikel sudah ada',
        );
      }

      updateData.title = validData.title;
    }

    if (validData.content) {
      updateData.content = validData.content;
    }

    if (validData.categoryId) {
      const categoryExists = await CategoryRepository.findById(
        validData.categoryId,
      );

      if (!categoryExists) {
        throw new ResponseError(
          StatusCodes.BAD_REQUEST,
          'Kategori tidak ditemukan',
        );
      }

      updateData.categoryId = validData.categoryId;
    }

    if (validData.image) {
      updateData.image = validData.image;
    }

    await ArticleRepository.update(validData.id, updateData);

    if (validData.image && article.image) {
      fs.unlinkSync(article.image);
    }

    const newData = await ArticleRepository.findById(validData.id);

    return {
      id: newData.id,
      title: newData.title,
      content: newData.content,
      userId: newData.userId,
      image: newData.image,
      category: {
        id: newData.category.id,
        name: newData.category.name,
      },
      createdAt: newData.createdAt,
      updatedAt: newData.updatedAt,
    };
  }

  static async delete(request: IDeleteArticleRequest): Promise<void> {
    const validData = Validator.validate(ArticleValidation.DELETE, request);

    const article = await ArticleRepository.findById(validData.id);

    if (!article) {
      throw new ResponseError(StatusCodes.NOT_FOUND, 'Artikel tidak ditemukan');
    }

    await ArticleRepository.delete(validData.id);

    if (article.image) {
      fs.unlinkSync(article.image);
    }
  }
}
