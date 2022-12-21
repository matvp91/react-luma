import { CustomError } from "ts-custom-error";
import type { ReactLumaOpaqueValue } from "./types";

export class ReactLumaElementNonExistent extends CustomError {
  obj: ReactLumaElementNonExistent;

  constructor(obj: ReactLumaOpaqueValue) {
    super("ReactLumaElement does not exist on this object.");
    this.obj = obj;
  }
}
