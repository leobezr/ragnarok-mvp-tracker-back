import { UserModel } from "./model";
import bcrypt from "bcrypt";

interface Credential {
  email: string;
  password: string;
}

const _hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const create = async (credentials: Credential) => {
  const { email, password } = credentials;

  const user = await UserModel.findOne({ email });

  if (user) {
    throw "Email is already in use.";
  } else {
    const userModel = new UserModel({
      email,
      password: await _hashPassword(password),
      name: "",
      timerTableId: null,
      createdAt: Date.now(),
      clanId: null,
    });

    try {
      await userModel.save();

      return "User created";
    } catch (err) {
      throw err;
    }
  }
};

export const login = async (credentials: Credential) => {
  const { email, password } = credentials;
  const genericResponse = "Incorrect password or email";

  const user = await UserModel.findOne({ email });

  if (user) {
    const result = await bcrypt.compare(password, user.password);

    if (result) {
      return true;
    }
  }

  return genericResponse;
};
