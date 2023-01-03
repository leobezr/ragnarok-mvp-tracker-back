import express, { Express } from "express";
import { User } from "./modules";
import { Api } from "./api";

const port = process.env.PORT;

export const apiRegisterEndpoints = (server: Express) => {
  server.use(express.urlencoded());
  server.use(express.json());

  const api = new Api(server);

  User(api);

  server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
};
