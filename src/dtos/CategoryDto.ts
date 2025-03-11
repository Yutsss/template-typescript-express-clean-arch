export interface ICreateCategoryRequest {
  name: string;
}

export interface ICreateCategoryResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetCategoryRequest {
  categoryId: string;
}

export interface IGetCategoryResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAllCategoryRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IGetAllCategoryResponse {
  totalPage: number;
  currentPage: number;
  categories: IGetCategoryResponse[];
}

export interface IUpdateCategoryRequest {
  categoryId: string;
  name: string;
}

export interface IUpdateCategoryResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeleteCategoryRequest {
  categoryId: string;
}
