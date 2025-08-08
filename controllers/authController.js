import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;

// @desc    register a USER / create
// route    POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    // not found hash the password to store in db
    const hashedPassword = await bcrypt.hash(password, 10);
    // if not found then create 201
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email,
      },
    });
    console.log("User Created=>", newUser);
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    login  user
// route    GET /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email or password missing" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

    // token payload
    const tokenPayload = {
      id: user._id,
      email: user.email,
    };
    // sign token
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      message: "Logged in Successfully",
      user: {
        id: user._id,
        name: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("login controller server error 500=>", error);
    res.status(500).json({ message: "server error" });
  }
};
