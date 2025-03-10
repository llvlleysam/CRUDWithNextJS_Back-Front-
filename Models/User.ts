import mongoose from "mongoose";

export interface UserModel {
  username: string;
  password: string;
  name?: string;
  role?: "admin" | "user";
  email?: string;
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    email: { type: String },
    role: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserModelDB =
  mongoose.models.User || mongoose.model("User", userSchema);

export default UserModelDB;