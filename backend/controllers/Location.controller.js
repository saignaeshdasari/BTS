import mongoose from "mongoose";

import Bus from "../model/Bus.js";
import Location from "../model/Location.js";

import { reverseGeocode } from "../services/geocodingService.js";

const findBus = async (busId) => {
  if (mongoose.isValidObjectId(busId)) {
    const bus = await Bus.findById(busId);

    if (bus) {
      return bus;
    }
  }

  return Bus.findOne({
    busNumber: busId,
  });
};

export const saveLocation = async (req, res) => {
  try {
    const { busId, latitude, longitude, speed = 0, satellites = 0 } = req.body;

    if (
      busId === undefined ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,

        message: "busId, latitude and longitude are required",
      });
    }

    const bus = await findBus(busId);

    if (!bus) {
      return res.status(404).json({
        success: false,

        message: "Bus not found",
      });
    }

    const locationName = await reverseGeocode(
      Number(latitude),
      Number(longitude),
    );

    const location = await Location.create({
      bus: bus._id,

      latitude: Number(latitude),

      longitude: Number(longitude),

      speed: Number(speed),

      satellites: Number(satellites),

      locationName,

      timestamp: new Date(),
    });

    bus.isOnline = true;

    bus.lastSeen = location.timestamp;

    await bus.save();

    const payload = {
      busId: bus.busNumber,

      busMongoId: bus._id,

      latitude: location.latitude,

      longitude: location.longitude,

      speed: location.speed,

      satellites: location.satellites,

      locationName: location.locationName,

      timestamp: location.timestamp,
    };

    req.io.emit("busLocation", payload);

    req.io.to(`bus:${bus._id}`).emit("busLocation", payload);

    res.status(201).json({
      success: true,

      message: "Location saved",

      location: payload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const getLatestLocation = async (req, res) => {
  const bus = await findBus(req.params.busId);

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }

  const location = await Location.findOne({
    bus: bus._id,
  }).sort({
    timestamp: -1,
  });

  if (!location) {
    return res.status(404).json({
      success: false,
      message: "Location not available",
    });
  }

  res.json({
    success: true,

    location,
  });
};

export const getLocationHistory = async (req, res) => {
  const bus = await findBus(req.params.busId);

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }

  const locations = await Location.find({
    bus: bus._id,
  })
    .sort({
      timestamp: -1,
    })
    .limit(100);

  res.json({
    success: true,

    count: locations.length,

    locations,
  });
};
