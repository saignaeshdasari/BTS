import User from "../model/userModel.js";
import Bus from "../model/Bus.js";

export const getDashboard = async (req, res) => {
  const [totalDrivers, totalStudents, totalBuses, activeBuses] =
    await Promise.all([
      User.countDocuments({
        role: "driver",
        isActive: true,
      }),

      User.countDocuments({
        role: "student",
        isActive: true,
      }),

      Bus.countDocuments(),

      Bus.countDocuments({
        isOnline: true,
      }),
    ]);

  res.json({
    success: true,

    dashboard: {
      totalDrivers,

      totalStudents,

      totalBuses,

      activeBuses,

      offlineBuses: totalBuses - activeBuses,
    },
  });
};

export const getStudents = async (req, res) => {
  const students = await User.find({
    role: "student",
  })
    .select("-password")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    students,
  });
};

export const getStudent = async (req, res) => {
  const student = await User.findOne({
    _id: req.params.studentId,
    role: "student",
  }).select("-password");

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.json({
    success: true,
    student,
  });
};

export const updateStudent = async (req, res) => {
  const allowed = ["name", "phone", "department", "year", "isActive"];

  const update = {};

  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      update[field] = req.body[field];
    }
  }

  const student = await User.findOneAndUpdate(
    {
      _id: req.params.studentId,

      role: "student",
    },

    update,

    {
      new: true,
      runValidators: true,
    },
  ).select("-password");

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.json({
    success: true,
    student,
  });
};

export const deleteStudent = async (req, res) => {
  const student = await User.findOneAndUpdate(
    {
      _id: req.params.studentId,

      role: "student",
    },

    {
      isActive: false,
    },

    {
      new: true,
    },
  );

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.json({
    success: true,

    message: "Student deactivated",
  });
};
