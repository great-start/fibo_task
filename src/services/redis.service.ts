import { RedisClient } from '../app';

class RedisService {
    async saveNumber(ticketNumber: string, fiboNumber: number) {
        await RedisClient.set(String(ticketNumber), String(fiboNumber), {
            EX: Number(process.env.REDIS_EX) | 300,
            NX: true,
        });
    }

    async getNumber(ticketNumber: string) {
        const string = await RedisClient.get(ticketNumber);
        return string;
    }
}

export const redisService = new RedisService();