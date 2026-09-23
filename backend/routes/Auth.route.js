import express from "express";

import {
  adminSignup,
  studentSignup,
  login,
  getMe,
} from "../controllers/Auth.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/admin/signup", adminSignup);

router.post("/student/signup", studentSignup);

router.post("/login", login);

router.get("/me", protect, getMe);

export default router;
