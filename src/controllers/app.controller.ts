import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { redisService } from "../services/redis.service";

class AppController {
  public async getTicket(req: Request, res: Response) {
    try {
      const { number } = req.body;

      if (number === 0) {
        res.status(400).json({
          message: 'Index must start with 1',
          error: 'Bad request',
          statusCode: 400,
        });
        return;
      }

      const ticketNumber = uuidv4();

      res.json({
        ticket: ticketNumber,
      });

      function fibonacci(index: number) {
        let i,
          b,
          fib = [];

        fib[0] = 0;
        fib[1] = 1;
        if (index === 1) return fib[0];
        if (index === 2 || index === 3) return fib[1];

        for (i = 2, b = 1; b <= index; i += 1, b += 1) {
          fib[i] = fib[i - 2] + fib[i - 1]; // generate the rest of the fibonacci array
          if (index === b) {
            // if we find the number
            return fib[i - 2]; //return it
          }
        }
      }

      const fiboNumber = fibonacci(Number(number));

      if (fiboNumber) await redisService.saveNumber(ticketNumber, fiboNumber);


    } catch (e: any) {
      res.status(500).json({
        message: 'Server error',
        error: 'Internal Server Error',
        statusCode: 500,
      });
    }
  }

  public async getFiboNumber(req: Request, res: Response) {
    try {
      const { ticket } = req.body;

      const number = await redisService.getNumber(ticket);

      if (!number) {
        res.status(404).json({
          message: 'Ticket not found',
          error: 'Not found',
          statusCode: 404,
        });
      }

      res.json({
        Fibonacci: number
      })
    } catch (e: any) {
      res.status(500).json({
        message: 'Server error',
        error: 'Internal Server Error',
        statusCode: 500,
      });
    }
  }
}

export const appController = new AppController();
