import { username, password } from "./config";
import DB from "./db";

export const db = () => new DB(username, password);
