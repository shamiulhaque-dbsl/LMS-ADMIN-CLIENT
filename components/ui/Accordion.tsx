"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-utils";
import Text from "./Text";

// Types
type AccordionContextType = {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  type: "single" | "multiple";
};

// Context
const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  items: {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
  }[];
  type?: "single" | "multiple";
  defaultValue?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  type = "single",
  defaultValue,
  className,
}) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    new Set(defaultValue ? [defaultValue] : [])
  );

  const toggleItem = React.useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (type === "single") {
          next.clear();
        }
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [type]
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("divide-y divide-gray-200", className)}>
        {items.map((item) => (
          <div key={item.value} className="border-b">
            <button
              className="flex w-full items-center justify-between py-4 text-left transition-all hover:underline"
              onClick={() => toggleItem(item.value)}
            >
              <Text as="span" variant="dark">
                {item.trigger}
              </Text>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform duration-200",
                  openItems.has(item.value) && "rotate-180"
                )}
              />
            </button>
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openItems.has(item.value) ? "max-h-96" : "max-h-0"
              )}
            >
              <Text as="p" className="pb-4 pt-0">
                {item.content}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </AccordionContext.Provider>
  );
};
