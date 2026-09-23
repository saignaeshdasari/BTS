import "dotenv/config";

import express from "express";
import cors from "cors";
import http from "http";

import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/Auth.route.js";

import adminRoutes from "./routes/adminRoutes.js";

import driverRoutes from "./routes/driverRoutes.js";

import studentRoutes from "./routes/studentroutes.js";

import busRoutes from "./routes/Bus.routes.js";

import locationRoutes from "./routes/Location.routes.js";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "College Bus Tracking API is running",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,

    message: "Server healthy",
  });
});

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/drivers", driverRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/buses", busRoutes);

app.use("/api/location", locationRoutes);

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinBus", (busId) => {
    socket.join(`bus:${busId}`);

    console.log(`${socket.id} joined bus ${busId}`);
  });

  socket.on("leaveBus", (busId) => {
    socket.leave(`bus:${busId}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  await connectDB();

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
