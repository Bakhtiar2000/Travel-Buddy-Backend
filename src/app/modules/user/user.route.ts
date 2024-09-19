import express from "express";

const router = express.Router();

router.post("/", userControllers.createUser());

export const userRoutes = router;
