import { StatusCodes } from 'http-status-codes';

import type {
  ICreateCategoryRequest,
  ICreateCategoryResponse,
  IGetCategoryRequest,
  IGetCategoryResponse,
  IGetAllCategoryRequest,
  IUpdateCategoryRequest,
  IUpdateCategoryResponse,
  IDeleteCategoryRequest,
  IGetAllCategoryResponse,
} from '../dtos';
import { ResponseError } from '../error/ResponseError';
import { CategoryRepository } from '../repositories';
import { Validator } from '../utils';
import { CategoryValidation } from '../validations';

export class CategoryService {
  static async create(
    request: ICreateCategoryRequest,
  ): Promise<ICreateCategoryResponse> {
    const validData = Validator.validate(CategoryValidation.CREATE, request);

    const category = await CategoryRepository.findByName(validData.name);

    if (category) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Kategori sudah ada');
    }

    const newCategory = await CategoryRepository.create({
      name: validData.name,
    });

    return {
      id: newCategory.id,
      name: newCategory.name,
      createdAt: newCategory.createdAt,
      updatedAt: newCategory.updatedAt,
    };
  }

  static async get(
    request: IGetCategoryRequest,
  ): Promise<IGetCategoryResponse> {
    const validData = Validator.validate(CategoryValidation.GET, request);

    const category = await CategoryRepository.findById(validData.categoryId);

    if (!category) {
      throw new ResponseError(
        StatusCodes.NOT_FOUND,
        'Kategori tidak ditemukan',
      );
    }

    return {
      id: category.id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  static async getAll(
    request: IGetAllCategoryRequest,
  ): Promise<IGetAllCategoryResponse> {
    const validData = Validator.validate(CategoryValidation.GET_ALL, request);

    const take = validData.limit;
    const skip = (validData.page - 1) * take;
    const search = validData.search;

    if (!take || !validData.page) {
      const categories = await CategoryRepository.findAll(search);

      return {
        totalPage: 1,
        currentPage: 1,
        categories: categories.map(category => ({
          id: category.id,
          name: category.name,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
        })),
      };
    }

    const totalCategories = await CategoryRepository.count(search);

    if (totalCategories === 0) {
      return {
        totalPage: 1,
        currentPage: 1,
        categories: [],
      };
    }

    if (skip >= totalCategories) {
      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Halaman tidak valid');
    }

    const categories = await CategoryRepository.findAllWithPagination(
      skip,
      take,
      search,
    );

    const totalPage = Math.ceil(totalCategories / take);
    const currentPage = Math.ceil(skip / take) + 1;

    return {
      totalPage,
      currentPage,
      categories: categories.map(category => ({
        id: category.id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      })),
    };
  }

  static async update(
    request: IUpdateCategoryRequest,
  ): Promise<IUpdateCategoryResponse> {
    const validData = Validator.validate(CategoryValidation.UPDATE, request);

    const category = await CategoryRepository.findById(validData.categoryId);

    if (!category) {
      throw new ResponseError(
        StatusCodes.NOT_FOUND,
        'Kategori tidak ditemukan',
      );
    }

    const existingCategory = await CategoryRepository.findByName(
      validData.name,
    );

    if (existingCategory) {
      if (existingCategory.id === validData.categoryId) {
        throw new ResponseError(
          StatusCodes.BAD_REQUEST,
          'Nama kategori tidak boleh sama',
        );
      }

      throw new ResponseError(StatusCodes.BAD_REQUEST, 'Kategori sudah ada');
    }

    const updatedCategory = await CategoryRepository.update(
      validData.categoryId,
      {
        name: validData.name,
      },
    );

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      createdAt: updatedCategory.createdAt,
      updatedAt: updatedCategory.updatedAt,
    };
  }

  static async delete(request: IDeleteCategoryRequest): Promise<void> {
    const validData = Validator.validate(CategoryValidation.DELETE, request);

    const category = await CategoryRepository.findById(validData.categoryId);

    if (!category) {
      throw new ResponseError(
        StatusCodes.NOT_FOUND,
        'Kategori tidak ditemukan',
      );
    }

    await CategoryRepository.delete(validData.categoryId);
  }
}
