import express from "express";

import {
  saveLocation,
  getLatestLocation,
  getLocationHistory,
} from "../controllers/Location.controller.js";

import { protect } from "../middleware/authMiddleware.js";

import { deviceApiKey } from "../middleware/devicemiddleware.js";

const router = express.Router();

router.post("/", deviceApiKey, saveLocation);

router.get("/:busId/latest", protect, getLatestLocation);

router.get("/:busId/history", protect, getLocationHistory);

export default router;
