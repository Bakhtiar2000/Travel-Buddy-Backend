import express from "express";
import { travelBuddyControllers } from "./travelBuddy.controller";
import validateRequest from "../../utils/validateRequest";
import { travelBuddyValidations } from "./travelBuddy.validation";
import auth from "../../middleWears/auth";

const router = express.Router();

router.get("/:tripId", travelBuddyControllers.getAllTravelBuddies);

router.put(
  "/:buddyId/respond",
  //   auth(),
  validateRequest(travelBuddyValidations.respondTravelBuddyValidationSchema),
  travelBuddyControllers.respondToTravelBuddyRequest
);

export const travelBuddyRoutes = router;
