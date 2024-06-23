import express, { Express, Request, Response } from "express";
import { logger } from "./middleware/logger";
import authRoutes from "./routes/authRoutes";
const app: Express = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(logger);
app.use("/api/users", authRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World! ʕ ·(エ)· ʔ");
});

app.listen(PORT, () => console.log(`[server]: Listening on port: ${PORT}`));
