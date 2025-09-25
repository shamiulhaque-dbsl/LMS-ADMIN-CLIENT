import { useEffect } from "react";

export const useBodyScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [locked]);
};
