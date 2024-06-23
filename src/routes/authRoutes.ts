import { Router } from "express";
import { register } from "../controller/authController";

const router = Router();

router.post("/register", register);

export default router;