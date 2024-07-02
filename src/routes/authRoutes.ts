import { Router } from "express";
import { login, logout, register } from "../controller/authController";
import { authenticateToken } from "../middleware/auth";
import {
  registerValidator,
  loginValidator,
  logoutValidator,
} from "../utils/validation/authValidator";

const router = Router();

router.post("/register", registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/logout", logoutValidator, logout);

export default router;
