import { useEffect, useRef } from "react";

export function useClickOutside(handler, capture = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", handleClick, capture);

    return () => document.removeEventListener("click", handleClick, capture);
  }, [handler, capture]);

  return ref;
}
