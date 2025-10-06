import express from "express";
import type { Request, Response } from "express";
import env from "./utils/env";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import { logging } from "./middleware/logging";
import { errorHandler, notFound } from "./middleware/error-handler";
import { setupSwaggerDocs } from "./utils/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser(env.COOKIE_SECRET));
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 15, // 15min
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());
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
