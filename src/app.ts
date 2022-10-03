import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

import { apiRouter } from "./router/api.router";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});