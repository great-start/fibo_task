import express, { Express } from "express";
import dotenv from "dotenv";

import { apiRouter } from "./router/api.router";
import { createClient } from "redis";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT, REDIS_URL } = process.env;

export const RedisClient = createClient({ url: REDIS_URL });

RedisClient.on("error", (err) => console.log("Redis Client Error", err));

app.use("/", apiRouter);

app.listen(PORT, async () => {
  await RedisClient.connect()
    .then(() => {
      console.log("Local Redis Store connected!");
    })
    .catch((err) =>
      console.log("Error during Redis Store initialization!!!", err)
    );
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
