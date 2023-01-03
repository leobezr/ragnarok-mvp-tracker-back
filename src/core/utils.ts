import { Dictionary } from "../types/core";

export default class Utils {
  /**
   * This helper is perfect for using mutable unknown values.
   * Mostly used with forms.
   *
   * @param checkableItem Dictionary, but accepts anything
   * @returns False | checkableItem
   *
   * @example
   * const ElForm = ref(null)
   *
   * const validateForm = () => {
   *  const Form = Utils.isType(ElForm, "validate")
   *
   *  if (Form && await Form.validate) {
   *    emit("confirm")
   *  }
   * }
   */
  public static isType<T>(checkableItem: any, checkKey: string) {
    if (JSON.stringify(checkableItem.constructor()) === "{}") {
      const _checkableItem = checkableItem as Dictionary;

      if (_checkableItem.hasOwnProperty(checkKey)) {
        return checkableItem as T;
      }
    }

    return false;
  }

  public static requiredFields(fields: string[], item: any) {
    if (item && JSON.stringify(item.constructor()) === "{}") {
      return fields.every((field) => Utils.isType(item, field));
    }

    return false;
  }
}
