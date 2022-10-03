import { Request, Response } from "express";


class AppController {
    public getTicket(req: Request, res: Response) {
        try {
            const { number } = req.body;

            function fibonacci(index: number){
                let i,b, fib = [];

                fib[0] = 0;
                fib[1] = 1;
                if (index === 0) { res.status(400).json({ message: 'index must start with 1' }); return }
                if (index === 1) return fib[0];
                if (index === 2 || index === 3) return fib[1];

                for (i = 2, b = 1; b <= index; i+=1, b+=1) {
                    fib[i] = fib[i-2] + fib[i-1]; // generate the rest of the fibonacci array
                    if (index === b) { // if we find the number
                        return fib[i-2]; //return it
                    }
                }
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
