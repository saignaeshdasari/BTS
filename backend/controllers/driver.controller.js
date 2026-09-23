import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import Bus from "../model/Bus.js";

export const createDriver = async (req, res) => {
  const { name, email, password, phone } = req.body;

  const existing = await User.findOne({
    email,
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Email already registered",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const driver = await User.create({
    name,

    email,

    password: passwordHash,

    phone,

    role: "driver",
  });

  res.status(201).json({
    success: true,

    message: "Driver created successfully",

    driver: {
      id: driver._id,

      name: driver.name,

      email: driver.email,

      phone: driver.phone,

      role: driver.role,
    },
  });
};

export const getDrivers = async (req, res) => {
  const drivers = await User.find({
    role: "driver",
  }).select("-password");

  res.json({
    success: true,
    drivers,
  });
};

export const getDriver = async (req, res) => {
  const driver = await User.findOne({
    _id: req.params.driverId,

    role: "driver",
  }).select("-password");

  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  const bus = await Bus.findOne({
    driver: driver._id,
  });

  res.json({
    success: true,
    driver,
    bus,
  });
};

export const deleteDriver = async (req, res) => {
  const driver = await User.findOneAndUpdate(
    {
      _id: req.params.driverId,

      role: "driver",
    },

    {
      isActive: false,
    },

    {
      new: true,
    },
  );

  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  await Bus.updateMany(
    {
      driver: driver._id,
    },
    {
      driver: null,
    },
  );

  res.json({
    success: true,

    message: "Driver deactivated",
  });
};

export const getMyDriverProfile = async (req, res) => {
  try {
    // Get logged-in driver
    const driver = await User.findById(req.user._id).select("-password");

    if (!driver) {
      return res.status(404).json({
        message: "Driver not found",
      });
    }

    // Find bus assigned to this driver
    const bus = await Bus.findOne({
      driver: driver._id,
    });

    res.status(200).json({
      success: true,

      driver,

      bus: bus || null,
    });
  } catch (error) {
    console.error("GET DRIVER PROFILE ERROR:", error);

    res.status(500).json({
      success: false,

      message: "Server error",
    });
  }
};
