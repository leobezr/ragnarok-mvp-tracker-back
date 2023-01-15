import { UserModel } from "./model";
import { User, HotmartWebhook, HotmartProduct, SaltHash } from "./user.type";
import Crypto from "crypto";
import jwt from "jsonwebtoken";

const pepper = process.env.PASSWORD_PEPPER ?? "";

export const passwordHash = (salt: string, password: string | number) => {
  const saltedPassword = pepper + `${password}`;

  return Crypto.pbkdf2Sync(saltedPassword, salt, 10000, 512, "sha512").toString(
    "hex"
  );
};

export const getUserByToken = async (token: string) => {
  const secretAuthKey = process.env.AUTH_SECRET ?? "";
  const payload = jwt.verify(token, secretAuthKey) as jwt.JwtPayload;

  if (payload && payload?.email) {
    const userModel = await UserModel.findOne({ email: payload.email });

    return userModel?.toObject();
  }
};

const alreadyOwnsProduct = (
  newProductId: string,
  products: HotmartProduct[]
) => {
  return products.some((prod) => prod.id === newProductId);
};

const Token = (id: string, name: string, email: string) => {
  const payload = { id, name, email };
  const tokenExpirationDate = 1000 * 60 * 60 * 24 * 7;
  const secretAuthKey = process.env.AUTH_SECRET ?? "";

  return jwt.sign(payload, secretAuthKey, {
    expiresIn: tokenExpirationDate,
  });
};

const Product = (hotmartWebhook: HotmartWebhook): HotmartProduct => {
  return {
    id: hotmartWebhook.prod,
    name: hotmartWebhook.prod_name,
    price: hotmartWebhook.price,
    purchaseDate: hotmartWebhook.purchase_date,
  };
};

const CreateUserPassword = (phoneNumber: number): SaltHash => {
  const salt = Crypto.randomBytes(16).toString("hex");

  return {
    salt,
    hash: passwordHash(salt, phoneNumber),
  };
};

const CreateUser = (hotmartWebhook: HotmartWebhook): User => {
  const { email, name, phone_number } = hotmartWebhook;

  return {
    token: Token("", name, email),
    password: CreateUserPassword(phone_number),
    email,
    name,
    packages: [],
    products: [Product(hotmartWebhook)],
  };
};

export default class UserController {
  /**
   * Hotmart sends a webhook to the server and we update
   * the user using it's payload. Creates users when we
   * can't find them using their email on DB. Last updates
   * the user with the purchased item.
   *
   * @param hotmartWebhook Hotmart webhook, product sold
   */
  public static async registerUserProduct(hotmartWebhook: HotmartWebhook) {
    const { email } = hotmartWebhook;
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      const userModel = userExists;
      const newProduct = Product(hotmartWebhook);

      if (!alreadyOwnsProduct(newProduct.id, userModel.products)) {
        await userModel.updateOne({
          products: [...userModel.products, newProduct],
        });

        await userModel.save();
      }
    } else {
      const userModel = new UserModel<User>(CreateUser(hotmartWebhook));
      await userModel.save();
    }
  }

  /**
   * Create token and update token on DB using
   * Salt and Pepper method
   *
   * @param email User email
   * @param password User password, un-hashed
   * @returns User
   */
  public static async userLogin(email: string, password: string) {
    const userModel = await UserModel.findOne({ email });

    if (userModel) {
      const { hash, salt } = userModel.password;
      const credentialHashed = passwordHash(salt, password);

      if (credentialHashed === hash) {
        const token = Token(userModel.id, userModel.name, userModel.email);
        await userModel.updateOne({ token });
        return (await userModel.save()).toObject();
      }
    } else {
      throw "Invalid email or password";
    }
  }
}
