import Bus from "../model/Bus.js";
import User from "../model/userModel.js";

export const createBus = async (req, res) => {
  const { busNumber, registrationNumber, routeName, status } = req.body;

  const existing = await Bus.findOne({
    $or: [{ busNumber }, { registrationNumber }],
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Bus number or registration number already exists",
    });
  }

  const bus = await Bus.create({
    busNumber,

    registrationNumber,

    routeName,

    status: status || "active",
  });

  res.status(201).json({
    success: true,

    message: "Bus created successfully",

    bus,
  });
};

export const getBuses = async (req, res) => {
  const buses = await Bus.find().populate("driver", "name email phone");

  res.json({
    success: true,
    buses,
  });
};

export const getBus = async (req, res) => {
  const bus = await Bus.findById(req.params.busId).populate(
    "driver",
    "name email phone",
  );

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }

  res.json({
    success: true,
    bus,
  });
};

export const updateBus = async (req, res) => {
  const allowed = ["busNumber", "registrationNumber", "routeName", "status"];

  const update = {};

  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      update[field] = req.body[field];
    }
  }

  const bus = await Bus.findByIdAndUpdate(
    req.params.busId,

    update,

    {
      new: true,

      runValidators: true,
    },
  );

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }

  res.json({
    success: true,
    bus,
  });
};

export const deleteBus = async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.busId);

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }

  res.json({
    success: true,

    message: "Bus deleted successfully",
  });
};

export const assignDriver = async (req, res) => {
  const { driverId } = req.body;

  const driver = await User.findOne({
    _id: driverId,

    role: "driver",

    isActive: true,
  });

  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  const existing = await Bus.findOne({
    driver: driverId,

    _id: {
      $ne: req.params.busId,
    },
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: "Driver already assigned to another bus",
    });
  }

  const bus = await Bus.findByIdAndUpdate(
    req.params.busId,

    {
      driver: driverId,
    },

    {
      new: true,
    },
  ).populate("driver", "name email phone");

  if (!bus) {
    return res.status(404).json({
      success: false,
      message: "Bus not found",
    });
  }

  res.json({
    success: true,

    message: "Driver assigned successfully",

    bus,
  });
};

export const unassignDriver = async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(
    req.params.busId,

    {
      driver: null,
    },

    {
      new: true,
    },
  );

  res.json({
    success: true,
    bus,
  });
};
