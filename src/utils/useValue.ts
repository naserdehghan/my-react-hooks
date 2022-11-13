import clone from "lodash/clone";
import { useDebugValue, useState } from "react";

type AcceptableTypes =
  | Array<unknown>
  | Record<string | number | symbol, unknown>;

export function useValue<T extends AcceptableTypes>(
  initialValue: T,
  debugName?: string
): [T, (applier: (prev: T) => void) => void] {
  const [value, setState] = useState(initialValue);

  if (!!debugName) useDebugValue(debugName);

  const setValue = (applier: (prev: T) => void) => {
    const cloned = clone(value);
    applier(cloned);
    setState(cloned);
  };

  return [value, setValue];
}
