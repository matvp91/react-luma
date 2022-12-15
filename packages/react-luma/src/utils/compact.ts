export const NOOP = () => {};

export function compact<T>(a: Array<T>) {
  return a.filter((item) => !!item);
}
