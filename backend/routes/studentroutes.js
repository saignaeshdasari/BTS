import express from "express";

import {
  getProfile,
  updateProfile,
  getBuses,
  getBus,
  getBusLocation,
  getBusHistory,
} from "../controllers/studentcontroller.js";

import { protect, studentOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, studentOnly);

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.get("/buses", getBuses);

router.get("/buses/:busId", getBus);

router.get("/buses/:busId/location", getBusLocation);

router.get("/buses/:busId/history", getBusHistory);

export default router;
