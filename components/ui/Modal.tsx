import React from "react";
import { cn } from "@/lib/utils/tailwind-utils";
const Modal = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "rounded-lg shadow-lg bg-white w-full sm:w-11/12 md:w-3/4 overflow-y-auto max-h-screen mx-auto  py-2 text-black text-sm md:text-md ",
        className
      )}
    >
      {/* h-[90%] md:h-[95%] */}
      {children}
    </div>
  );
};

const ModalHead = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "flex justify-between items-center  pb-2 text-xl font-bold text-md md:text-lg px-5",
        className
      )}
    >
      {children}
    </div>
  );
};

const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("py-4 px-5", className)}>{children}</div>;
};

const ModalFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex gap-4 mt-2 px-5 py-2 justify-end", className)}>{children}</div>;
};

Modal.Head = ModalHead;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
