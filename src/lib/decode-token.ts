import jwt from "jsonwebtoken";

export const decodeToken = (expressRequest: any) => {
  const { authorization } = expressRequest;
  const token = authorization.split(" ")[1];

  return jwt.decode(token) as jwt.JwtPayload;
};
