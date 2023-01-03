import mongoose from "mongoose";
import { User } from "./user.type";

const collectionName = "users";

const UserSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    lowercase: false,
    unique: false,
    min: 10,
  },
  name: String,
  clanId: String || null,
  createdAt: Number,
  timerTableId: String || null,
});

export const UserModel = mongoose.model("User", UserSchema, collectionName);
