import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: [true, "Username is required"] },
    lastname: { type: String, required: true },
    username: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: [true, "Password is required"] },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
