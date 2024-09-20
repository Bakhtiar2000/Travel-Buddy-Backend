import express from "express";
import validateRequest from "../../utils/validateRequest";
import { tripControllers } from "./trip.controller";
import { tripValidations } from "./trip.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(tripValidations.createTripValidationSchema),
  tripControllers.createTrip
);

router.get("/", tripControllers.getAllTrips);
router.post(
  "/:tripId/request",
  validateRequest(tripValidations.sendTravelBuddyRequestValidationSchema),
  tripControllers.sendTravelBuddyRequest
);

export const tripRoutes = router;
