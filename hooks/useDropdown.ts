import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return { isOpen, toggle, close };
};
