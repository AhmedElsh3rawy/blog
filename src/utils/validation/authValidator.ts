import { check } from "express-validator";
import { validation } from "../../middleware/validation";

export const registerValidator = [
  check("username")
    .isLength({ min: 3 })
    .withMessage("Name should be at least 3 charctars")
    .isLength({ max: 20 })
    .withMessage("Name can be 20 charctars at most"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 charctars")
    .isLength({
      max: 30,
    })
    .withMessage("Password can be 30 characters at most"),
  validation,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 charctars")
    .isLength({
      max: 30,
    })
    .withMessage("Password can be 30 characters at most"),
  validation,
];

export const logoutValidator = [
  check("id").isNumeric().withMessage("Id should be a numeric value"),
  validation,
];
