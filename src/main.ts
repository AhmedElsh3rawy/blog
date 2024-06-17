import "dotenv/config";
import express, { Express, Request, Response } from "express";
import { logger } from "./middleware/logger";

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`[server]: Listening on port: ${PORT}`));
