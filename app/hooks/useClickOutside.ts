import { useEffect, RefObject } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: Function,
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target as Node)) {
          return;
        }

        handler(event);
      };

      // MouseEvent
      document.addEventListener("mousedown", listener);
      // TouchEvent
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    [ref, handler],
  );
}

export default useOnClickOutside;
