import express from "express";
import type { Request, Response } from "express";
import env from "./utils/env";
import cookieParser from "cookie-parser";
import cors from "cors";
import { logging } from "./middleware/logging";
import { errorHandler, notFound } from "./middleware/error-handler";
import { setupSwaggerDocs } from "./utils/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
  }),
);
app.use(logging);

setupSwaggerDocs(app);

const PORT = env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, stranger...");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[server]: Running at http://localhost:${PORT}`);
});
