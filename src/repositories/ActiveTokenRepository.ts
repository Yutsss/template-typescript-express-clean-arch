import { redisClient } from '../configs/redis';

export class ActiveTokenRepository {
  static async set(token: string, expiresIn: number) {
    return await redisClient.set('active-token', token, { EX: expiresIn });
  }

  static async get() {
    return await redisClient.get('active-token');
  }

  static async delete() {
    return await redisClient.del('active-token');
  }
}
