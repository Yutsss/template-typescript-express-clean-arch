export interface ICreateArticleRequest {
  title: string;
  content: string;
  userId: string;
  categoryId: string;
  image?: string;
}

export interface ICreateArticleResponse {
  id: string;
  title: string;
  content: string;
  userId: string;
  category: {
    id: string;
    name: string;
  };
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetArticleRequest {
  id: string;
}

export interface IGetArticleResponse {
  id: string;
  title: string;
  content: string;
  userId: string;
  category: {
    id: string;
    name: string;
  };
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAllArticleRequest {
  search?: string;
  page?: number;
  limit?: number;
}

export interface IGetAllArticleResponse {
  totalPage: number;
  currentPage: number;
  articles: IGetArticleResponse[];
}

export interface IGetArticlesByUserIdRequest {
  userId: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IGetArticlesByUserIdResponse {
  totalPage: number;
  currentPage: number;
  articles: IGetArticleResponse[];
}

export interface IDeleteArticleRequest {
  id: string;
}

export interface IUpdateArticleRequest {
  id: string;
  title?: string;
  content?: string;
  categoryId?: string;
  image?: string;
}

export interface IUpdateArticleResponse {
  id: string;
  title: string;
  content: string;
  userId: string;
  category: {
    id: string;
    name: string;
  };
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
