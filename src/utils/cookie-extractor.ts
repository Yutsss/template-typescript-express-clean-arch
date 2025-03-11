import type { Request } from 'express';

export const cookieExtractor = (req: Request) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['token'];
  }

  return token;
};
