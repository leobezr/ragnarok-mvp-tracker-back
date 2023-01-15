import { Express } from "express";
import { HotmartWebhook, UserCredentials } from "./user.type";
import { status } from "../../../core/request-error";
import UserController from "./controller";

export const UserEndpoint = (app: Express) => {
  const apiGroup = "/user/";
  const endpoint = (e: string) => apiGroup + e;

  /**
   * This endpoint will be used by Hotmart
   * to update and create users
   *
   * @api {post} /users/hotmart
   * @apiName UpdateProduct
   * @apiGroup user
   */
  app.post(endpoint("hotmart/"), async (req, res) => {
    try {
      const user = req.body as HotmartWebhook;
      await UserController.registerUserProduct(user);

      res.status(200).send();
    } catch (err) {
      res.status(status.error.badReq).send(err);
    }
  });

  /**
   * This endpoint is used for users to be able
   * to login into their passwords
   *
   * @api {post} /users/login
   * @apiName Login
   * @apiGroup user
   */
  app.post(endpoint("login/"), async (req, res) => {
    try {
      const credentials = req.body as UserCredentials;

      if (!credentials?.email || !credentials.password) {
        throw "Email and password are mandatory";
      }

      const { email, password } = credentials;
      const userDetails = await UserController.userLogin(email, password);

      res.status(200).send(userDetails);
    } catch (err) {
      res.status(status.error.notFound).send(err);
    }
  });
};
