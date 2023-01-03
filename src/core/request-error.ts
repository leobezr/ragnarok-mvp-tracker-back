import { Dictionary } from "../types/core";

export const errorMessage = (
  msg?: string,
  details = {} as Dictionary<string>
) => {
  return {
    message: msg ?? "Something went wrong",
    details,
  };
};

export const successMessage = (data: Dictionary<any> | string) => ({ data });

export const requiredFieldsMessage = (pendingFields: Dictionary<string>) => {
  return errorMessage("Required fields pending", pendingFields);
};
