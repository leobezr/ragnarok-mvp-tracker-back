import { Express, Request, Response } from "express";
import { validateJWT } from "./auth-validator";

type ApiCallback = (req: Request, res: Response) => void;
const BASE_API_URL = process.env.BASE_API;

export class Api {
  private server!: Express;

  constructor(server: Express) {
    this.server = server;
  }

  public async get(uri: string, callback: ApiCallback) {
    this.server.get(BASE_API_URL + uri, callback);
  }

  public post(uri: string, callback: ApiCallback) {
    this.server.post(BASE_API_URL + uri, callback);
  }

  public put(uri: string, callback: ApiCallback) {
    this.server.put(BASE_API_URL + uri, callback);
  }

  public delete(uri: string, callback: ApiCallback) {
    this.server.delete(BASE_API_URL + uri, callback);
  }

  public async validateToken(token: string) {
    return await validateJWT(token);
  }
}
