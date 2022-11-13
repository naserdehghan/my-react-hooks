import clone from "lodash/clone";
import { useDebugValue, useEffect, useState } from "react";
import { BehaviorSubject, Subscription } from "rxjs";

type AcceptableTypes =
  | Array<unknown>
  | Record<string | number | symbol, unknown>;

export function useSubject<T extends AcceptableTypes>(
  subject: BehaviorSubject<T>,
  debugName?: string
): [T, (applier: (prev: T) => void) => void] {
  let subscription: Subscription;
  const [value, setState] = useState(subject.getValue());
  if (!!debugName) useDebugValue(debugName);

  useEffect(() => {
    subscription = subject.subscribe((v) => setState(v));
    return () => subscription.unsubscribe();
  }, []);

  const setValue = (applier: (prev: T) => void) => {
    const cloned = clone(value);
    applier(cloned);
    subject.next(cloned);
  };

  return [value, setValue];
}
