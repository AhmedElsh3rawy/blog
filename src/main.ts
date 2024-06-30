import express, { Express, Request, Response } from "express";
import { logger } from "./middleware/logger";
import authRoutes from "./routes/authRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World! ʕ ·(エ)· ʔ");
});

app.all("*", notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`[server]: Listening on port: ${PORT} ( ͡° ͜ʖ ͡°)`),
);
