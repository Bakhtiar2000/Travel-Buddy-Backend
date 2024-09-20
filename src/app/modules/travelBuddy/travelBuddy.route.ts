import express from "express";
import { travelBuddyControllers } from "./travelBuddy.controller";

const router = express.Router();

router.get("/:tripId", travelBuddyControllers.getAllTravelBuddies);

export const travelBuddyRoutes = router;
