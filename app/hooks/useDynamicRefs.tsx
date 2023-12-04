import { RefObject, createRef } from "react";

const map = new Map<string, RefObject<unknown>>();

function setRef<T>(key: string): RefObject<T> | void {
  if (!key) throw Error(`useDynamicRefs: Cannot set ref without key `);
  const ref = createRef<T>();
  map.set(key, ref);
  return ref;
}

function getRef<T>(key: string): RefObject<T> | undefined | void {
  if (!key) throw Error(`useDynamicRefs: Cannot set ref without key `);
  return map.get(key) as RefObject<T>;
}

function useDynamicRefs<T>(): [
  (key: string) => void | RefObject<T>,
  (key: string) => void | RefObject<T>,
] {
  return [getRef, setRef];
}

export default useDynamicRefs;
