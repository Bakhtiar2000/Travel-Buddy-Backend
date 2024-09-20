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

export const tripRoutes = router;
