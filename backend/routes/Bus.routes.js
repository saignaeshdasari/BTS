import express from "express";

import {
  createBus,
  getBuses,
  getBus,
  updateBus,
  deleteBus,
  assignDriver,
  unassignDriver,
} from "../controllers/Bus.controller.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.post("/", createBus);

router.get("/", getBuses);

router.get("/:busId", getBus);

router.put("/:busId", updateBus);

router.delete("/:busId", deleteBus);

router.put("/:busId/assign-driver", assignDriver);

router.put("/:busId/unassign-driver", unassignDriver);

export default router;
