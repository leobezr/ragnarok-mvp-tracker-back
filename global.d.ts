import { Request, Response, Next } from "express";

declare type ApiCallback = (req: Request, res: Response, next?: Next) => void;

declare global {
  class Api {
    get(uri: string, callback: ApiCallback);
    post(uri: string, callback: ApiCallback);
    put(uri: string, callback: ApiCallback);
    delete(uri: string, callback: ApiCallback);
    validateToken(token: string);
  }
}
