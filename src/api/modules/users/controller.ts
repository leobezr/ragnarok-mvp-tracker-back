import { UserModel } from "./model";
import { User } from "./user.type";

export const registerUser = async (userDetails: User, userId: string) => {
  const { email, name } = userDetails;
  const userExists = await UserModel.findOne({ auth0Id: userId });

  if (!userExists) {
    const userModel = new UserModel({
      auth0Id: userId,
      packages: [],
      email,
      name,
    });

    try {
      await userModel.save();
    } catch (err) {
      throw err;
    }
  }
};
