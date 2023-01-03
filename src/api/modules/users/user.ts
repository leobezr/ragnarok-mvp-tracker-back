import { success, error } from "../../../core/status-response";
import { create } from "./controller";
import Utils from "../../../core/utils";

import {
  requiredFieldsMessage,
  successMessage,
} from "../../../core/request-error";

export const User = (app: Api) => {
  const endpointBaseName = "/user";

  app.get(`${endpointBaseName}/me`, async (req, res) => {
    try {
      const user = await app.validateToken(req.headers.authorization ?? "");

      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(403).send("Invalid token");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  /** Create new user */
  // app.post(`${endpointBaseName}/create`, async (req, res) => {
  //   try {
  //     if (!Utils.requiredFields(["email", "password"], req.body)) {
  //       return res.status(error.badReq).send(
  //         requiredFieldsMessage({
  //           password: "Required field",
  //           email: "Required field",
  //         })
  //       );
  //     }

  //     const { password, email } = req.body;

  //     if (password && email) {
  //       const user = await create({ email, password });

  //       res.status(success.ok).send(successMessage(user));
  //     } else {
  //       res.status(error.badReq).send(
  //         requiredFieldsMessage({
  //           ...(password && {
  //             password: "Password needs to have at least 8 characters",
  //           }),
  //           ...(email && { email: "Needs to be a valid email" }),
  //         })
  //       );
  //     }
  //   } catch (err) {
  //     res.status(500).send(err);
  //   }
  // });
};
