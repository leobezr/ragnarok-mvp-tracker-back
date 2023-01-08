import mongoose from "mongoose";
import { User } from "./user.type";

const collectionName = "users";

const UserSchema = new mongoose.Schema<User>({
  auth0Id: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  packages: {
    type: Array<string[]>,
    required: true,
  },
  name: String,
});

export const UserModel = mongoose.model("User", UserSchema, collectionName);
