import express from "express";
import { userControllers } from "./user.controller";
import validateRequest from "../../utils/validateRequest";
import { userValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(userValidations.createUserValidation),
  userControllers.createUser
);

export const userRoutes = router;
