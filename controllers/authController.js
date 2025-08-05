import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.SECRET_KEY;

// @desc    register a USER / create
// route    POST /api/users
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // check if user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    // not found hash the password to store in db
    const hashedPassword = await bcrypt.hash(password, 10);
    // if not found then create 201
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Sign the user info with jwt token (Generate token)
    const tokenPayload = {
      id: newUser._id,
      email: newUser.email,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.username,
        email: newUser.email,
      },
      token: token,
    });
  } catch (error) {
    console.log("Server Error", error);
    res.status(500).json({ message: "Server Error" });
  }
};
