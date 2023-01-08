import { Dictionary } from "../types/core";
import * as status from "./status-response";

export const errorMessage = (
  msg?: string,
  details = {} as Dictionary<string>
) => {
  return {
    message: msg ?? "Something went wrong",
    details,
  };
};

export { status };
