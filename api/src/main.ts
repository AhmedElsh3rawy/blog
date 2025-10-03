import express from "express";
import type { Request, Response } from "express";
import env from "./utils/env";
import { logging } from "./middleware/logging";
import { errorHandler, notFound } from "./middleware/error-handler";

const app = express();

const PORT = env.PORT;

app.use(logging);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, stranger...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Running on http://localhost:${PORT}`);
});
