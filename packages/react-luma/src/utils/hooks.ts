import { useRef } from "react";

type UseRefValueCreateFunction<T> = () => T;

export function useRefValue<T>(create: UseRefValueCreateFunction<T>) {
  const ref = useRef<T>();
  if (!ref.current) {
    ref.current = create();
  }
  return ref.current;
}
