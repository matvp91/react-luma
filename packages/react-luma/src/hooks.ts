import { useCallback, useRef } from "react";

type UseRefValueCreateFunction<T> = () => T;

export function useRefValue<T>(create: UseRefValueCreateFunction<T>) {
  const ref = useRef<T>();
  if (!ref.current) {
    ref.current = create();
  }
  return ref.current;
}

type UseMultiRefMap<T> = {
  [key: string]: T | undefined;
};

type UseMultiRefRegisterFunction<T> = (key: string) => (element: T) => void;

export function useMultiRef<T>(): [
  UseMultiRefMap<T>,
  UseMultiRefRegisterFunction<T>
] {
  const ref = useRef<UseMultiRefMap<T>>({});

  const createRegister = useCallback((key: string) => {
    return (element: T) => {
      ref.current[key] = element;
    };
  }, []);

  return [ref.current, createRegister];
}
