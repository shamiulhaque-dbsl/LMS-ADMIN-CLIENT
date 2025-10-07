export interface ModalProps {
  id: string;
  children: React.ReactNode;
}

export interface ModalContentProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "full";
}

export interface ModalOverlayProps {
  id: string;
  className?: string;
}

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export interface ModalCloseProps {
  id: string;
  className?: string;
}
