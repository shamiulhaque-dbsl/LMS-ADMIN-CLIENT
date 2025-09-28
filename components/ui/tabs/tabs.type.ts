export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: "horizontal" | "vertical";
  variant: "default" | "pills" | "underline" | "bordered";
  size: "sm" | "md" | "lg";
  disabled: boolean;
}

export interface ScrollableTabsProps {
  tabs: TabItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  orientation?: "horizontal" | "vertical";
  scrollable?: boolean;
  showScrollButtons?: boolean;
  variant?: "default" | "pills" | "underline" | "bordered";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  centered?: boolean;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export interface TabsRef {
  scrollToTab: (tabId: string) => void;
  getActiveTab: () => string | undefined;
  focusTab: (tabId: string) => void;
}
