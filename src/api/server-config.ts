import { Express, Request, Response, NextFunction } from "express";
import { expressjwt, GetVerificationKey } from "express-jwt";
import jwks from "jwks-rsa";

const jwtMiddleware = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-rm5t0mq1yfd1zkyb.us.auth0.com/.well-known/jwks.json",
  }) as GetVerificationKey,
  audience: "http://localhost:8000/callback",
  issuer: "https://dev-rm5t0mq1yfd1zkyb.us.auth0.com/",
  algorithms: ["RS256"],
});

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
