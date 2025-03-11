import { Router } from 'express';

import { Role } from '../constants';
import { ArticleController } from '../controllers';
import {
  authMiddleware,
  roleMiddleware,
  uploadMiddleware,
} from '../middlewares';

export const articleRoute: Router = Router();

articleRoute.post(
  '/',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  uploadMiddleware,
  ArticleController.create,
);
articleRoute.get('/:id', ArticleController.get);
articleRoute.get('/', ArticleController.getAll);
articleRoute.get(
  '/user/:userId',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  ArticleController.getArticlesByUserId,
);
articleRoute.patch(
  '/:id',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  uploadMiddleware,
  ArticleController.update,
);
articleRoute.delete(
  '/:id',
  authMiddleware,
  roleMiddleware([Role.ADMIN]),
  ArticleController.delete,
);
