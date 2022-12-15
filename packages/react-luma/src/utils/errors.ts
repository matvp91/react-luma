export class InvalidStyleConvertError extends Error {
  constructor(value: never) {
    super(`Unreachable case: ${value}`);
  }
}
