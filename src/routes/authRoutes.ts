import { Router } from "express";
import { login, register } from "../controller/authController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

export default router;
