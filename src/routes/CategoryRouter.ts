import { Router } from 'express';

import { Role } from '../constants';
import { CategoryController } from '../controllers';
import { authMiddleware, roleMiddleware } from '../middlewares';

export const categoryRoute: Router = Router();

categoryRoute.post(
  '/',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  CategoryController.create,
);
categoryRoute.get('/:categoryId', CategoryController.get);
categoryRoute.get('/', CategoryController.getAll);
categoryRoute.patch(
  '/:categoryId',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  CategoryController.update,
);
categoryRoute.delete(
  '/:categoryId',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  CategoryController.delete,
);
