import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js";

const publicUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    studentId: user.studentId,
    department: user.department,
    year: user.year,
  };
};

export const adminSignup = async (req, res) => {
  try {
    const { name, email, password, phone, setupKey } = req.body;

    if (!name || !email || !password || !setupKey) {
      return res.status(400).json({
        success: false,
        message: "name, email, password and setupKey are required",
      });
    }

    if (setupKey !== process.env.ADMIN_SETUP_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid admin setup key",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: passwordHash,
      phone,
      role: "admin",
    });

    res.status(201).json({
      success: true,

      message: "Admin created successfully",

      token: generateToken(admin),

      user: publicUser(admin),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const studentSignup = async (req, res) => {
  try {
    const { name, email, password, phone, studentId, department, year } =
      req.body;

    if (!name || !email || !password || !studentId) {
      return res.status(400).json({
        success: false,
        message: "name, email, password and studentId are required",
      });
    }

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { studentId }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email or student ID already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const student = await User.create({
      name,

      email,

      password: passwordHash,

      phone,

      studentId,

      department,

      year,

      role: "student",
    });

    res.status(201).json({
      success: true,

      message: "Student registered successfully",

      token: generateToken(student),

      user: publicUser(student),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,

      message: "Login successful",

      token: generateToken(user),

      user: publicUser(user),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

