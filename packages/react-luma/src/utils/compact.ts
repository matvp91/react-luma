export const noop = () => {};

export function compact<T>(a: Array<T>) {
  return a.filter((item) => !!item);
}

export const AbortableSymbol = Symbol("AbortableOperation");
