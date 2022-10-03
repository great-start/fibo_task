import { Request, Response } from "express";


class AppController {
    public getTicket(req: Request, res: Response) {
        try {
            const { number } = req.body;

            function fibonacci(num: number){
                var a = 1, b = 0, temp;

                while (num >= 0){
                    temp = a;
                    a = a + b;
                    b = temp;
                    num--;
                }

                return b;
            }

            const number1 = fibonacci(Number(number));

            console.log(number1);

            return res.json({ ticket: number1 });
        } catch (e) {
            // res.status(500).json({
            //     message: 'Server error',
            //     error: 'Internal Server Error',
            //     statusCode: 500,
            // });
        }
    }
}

export const appController = new AppController();
