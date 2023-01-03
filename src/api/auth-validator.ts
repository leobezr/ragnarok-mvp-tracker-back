import jwt from "jsonwebtoken";

export const validateJWT = (token: string): Promise<false | any> => {
  const secret = process.env.AUTH0_SECRET ?? "";

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user: any) => {
      console.log({ token, secret });
      if (user) {
        resolve(user);
      } else if (err) {
        reject(err);
      } else {
        resolve(false);
      }
    });
  });
};
