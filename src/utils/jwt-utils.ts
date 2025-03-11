import jwt from 'jsonwebtoken';

import { JWT_CONFIG } from '../constants';
import type { ITokenPayload, IForgotTokenPayload } from '../dtos';

export class JwtToken {
  static generateAccessToken(payload: ITokenPayload): string {
    const secret = JWT_CONFIG.JWT_SECRET;

    return jwt.sign(payload, secret, {
      expiresIn: JWT_CONFIG.JWT_EXPIRES_IN,
    });
  }

  static verifyToken(token: string): ITokenPayload {
    const secret = JWT_CONFIG.JWT_SECRET;

    return jwt.verify(token, secret) as ITokenPayload;
  }

  static generateForgotPasswordToken(payload: IForgotTokenPayload): string {
    const secret = JWT_CONFIG.JWT_FORGOT_PASSWORD_SECRET;

    return jwt.sign(payload, secret, {
      expiresIn: JWT_CONFIG.JWT_FORGOT_PASSWORD_EXPIRES_IN,
    });
  }

  static verifyForgotPasswordToken(token: string): IForgotTokenPayload {
    const secret = JWT_CONFIG.JWT_FORGOT_PASSWORD_SECRET;

    return jwt.verify(token, secret) as IForgotTokenPayload;
  }
}
