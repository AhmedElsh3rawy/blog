import { Router } from "express";
import { register } from "./auth.controller";
import { validate } from "../../middleware/validation";
import { createUserDtoSchema } from "../users/dto/create-user.dto";

const router: Router = Router();

router.post("/register", validate({ body: createUserDtoSchema }), register);

export default router;
