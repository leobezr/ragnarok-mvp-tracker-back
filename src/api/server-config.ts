import { Express, Request, Response, NextFunction } from "express";
import { whiteListEndpoints } from "./white-list";
import { getUserByToken } from "./modules/users/controller";

const jwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (whiteListEndpoints.includes(req.originalUrl)) {
    next();
  } else {
    const token = req.headers.authorization ?? "";

    try {
      const user = await getUserByToken(token);

      if (user) {
        next();
      } else {
        throw "Invalid token";
      }
    } catch (err) {
      res.status(401).send(err);
    }
  }
};

const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  req.baseUrl = "http://localhost:8000";

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

export const serverConfig = (server: Express) => {
  server.use(corsMiddleware);
  server.use(jwtMiddleware);
};
