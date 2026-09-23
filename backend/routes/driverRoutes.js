import express from "express";

import {
  createDriver,
  getDrivers,
  getDriver,
  deleteDriver,
  getMyDriverProfile,
} from "../controllers/driver.controller.js";

import {
  protect,
  adminOnly,
  driverOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, adminOnly, createDriver);

router.get("/", protect, adminOnly, getDrivers);

router.get("/me", protect, driverOnly, getMyDriverProfile);

router.get("/:driverId", protect, adminOnly, getDriver);

router.delete("/:driverId", protect, adminOnly, deleteDriver);

export default router;
