import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { db as DB } from "./src/db";
import { apiRegisterEndpoints } from "./src/api";

export const db = DB();
export const server = express();

db.connection.on("open", () => {
  if (db.connection.readyState === 1) {
    apiRegisterEndpoints(server);
  } else {
    console.error("🛑[db] - DB not connected");
  }
});
