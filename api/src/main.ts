import express from "express";
import type { Request, Response, NextFunction } from "express";
import env from "./utils/env";
import logger from "./config/logger";
import { logging } from "./middleware/logging";

const app = express();

app.use(logging);

const PORT = env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, stranger...");
});

app.listen(PORT, () => {
  console.log(`[server]: Running on http://localhost:${PORT}`);
});
