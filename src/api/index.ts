import express, { Express } from "express";
import { UserEndpoint } from "./modules";

const port = process.env.PORT;

export const apiRegisterEndpoints = (server: Express) => {
  server.use(express.urlencoded());
  server.use(express.json());

  UserEndpoint(server);

  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
};
