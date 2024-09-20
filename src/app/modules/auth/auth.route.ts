import express from "express";
import validateRequest from "../../utils/validateRequest";
import { authValidations } from "./auth.validation";
import { authControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(authValidations.createUserRegistrationValidation),
  authControllers.registerUser
);

export const authRoutes = router;
