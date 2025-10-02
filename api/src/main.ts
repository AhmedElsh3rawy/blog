import express, { type Request, Response } from "express";
import env from "./utils/env";

const app = express();

const PORT = env.PORT;

app.get("/", (req, res) => {
	res.send("Hello, stranger...");
});

app.listen(PORT, () => {
	console.log(`[server]: Running on http://localhost:${PORT}`);
});
