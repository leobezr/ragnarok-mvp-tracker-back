import mongoose, { mongo } from "mongoose";
import { HotmartProduct, User, SaltHash } from "./user.type";

const collectionName = "users";

const Password = new mongoose.Schema<SaltHash>({
  salt: String,
  hash: String,
});

const Product = new mongoose.Schema<HotmartProduct>({
  id: String,
  name: String,
  price: Number,
  purchaseDate: String,
});

const UserSchema = new mongoose.Schema<User>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: Password,
  name: String,
  packages: [String],
  products: [Product],
});

export const UserModel = mongoose.model("User", UserSchema, collectionName);
