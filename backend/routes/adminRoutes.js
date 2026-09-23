import express from "express";

import {
  getDashboard,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/admincontroller.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/dashboard", getDashboard);

router.get("/students", getStudents);

router.get("/students/:studentId", getStudent);

router.put("/students/:studentId", updateStudent);

router.delete("/students/:studentId", deleteStudent);

export default router;
