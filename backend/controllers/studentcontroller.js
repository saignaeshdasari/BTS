import User from "../model/userModel.js";
import Bus from "../model/Bus.js";
import Location from "../model/Location.js";

export const getProfile = async (req, res) => {
  res.json({
    success: true,

    student: req.user,
  });
};

export const updateProfile = async (req, res) => {
  const allowed = ["name", "phone", "department", "year"];

  const update = {};

  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      update[field] = req.body[field];
    }
  }

  const student = await User.findByIdAndUpdate(
    req.user._id,

    update,

    {
      new: true,

      runValidators: true,
    },
  ).select("-password");

  res.json({
    success: true,

    student,
  });
};

export const getBuses = async (req, res) => {
  const buses = await Bus.find().populate("driver", "name phone");

  res.json({
    success: true,

    buses,
  });
};

export const getBus = async (req, res) => {
  const bus = await Bus.findById(req.params.busId).populate(
    "driver",
    "name phone",
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

export const getBusLocation = async (req, res) => {
  const location = await Location.findOne({
    bus: req.params.busId,
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

export const getBusHistory = async (req, res) => {
  const locations = await Location.find({
    bus: req.params.busId,
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
