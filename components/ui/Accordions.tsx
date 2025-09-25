import { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-utils";

interface AccordionProps {
  children: ReactNode;
  className?: string;
  type?: "single" | "multiple";
}

interface AccordionItemProps {
  children: ReactNode;
  className?: string;
  value: string;
}

interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
  value: string;
}

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
  value: string;
}

// Context to manage accordion state
import { createContext, useContext } from "react";

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

const Accordion: React.FC<AccordionProps> = ({
  children,
  className,
  type = "single",
  ...props
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((item) => item !== value)
          : [...openItems, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("w-full border rounded-md", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn("border-b last:border-b-0", className)} {...props}>
      {children}
    </div>
  );
};

const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  className,
  children,
  value,
  ...props
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(value);

  return (
    <div className="flex">
      <div
        onClick={() => toggleItem(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
    </div>
  );
};

const AccordionContent: React.FC<AccordionContentProps> = ({
  className,
  children,
  value,
  ...props
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");

  const { openItems } = context;
  const isOpen = openItems.includes(value);

  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-200",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      )}
      {...props}
    >
      <div className={cn("px-4 py-4", className)}>{children}</div>
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
