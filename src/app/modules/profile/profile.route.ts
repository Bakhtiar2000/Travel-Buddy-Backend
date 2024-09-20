import express from "express";
import { profileControllers } from "./profile.controller";
import auth from "../../middleWears/auth";

const router = express.Router();

router.get("/", auth(), profileControllers.getAllProfiles);
router.patch("/", auth(), profileControllers.updateProfile);

export const profileRoutes = router;
