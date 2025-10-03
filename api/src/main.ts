import express from "express";
import type { Request, Response } from "express";
import env from "./utils/env";
import { logging } from "./middleware/logging";
import { errorHandler, notFound } from "./middleware/error-handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(logging);

const PORT = env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, stranger...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Running on http://localhost:${PORT}`);
});
