import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { tripRoutes } from "../modules/trip/trip.route";
import { travelBuddyRoutes } from "../modules/travelBuddy/travelBuddy.route";

const router = express.Router();
const moduleRoutes = [
  {
    path: "",
    route: authRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/trips",
    route: tripRoutes,
  },
  {
    path: "/travel-buddies",
    route: travelBuddyRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
