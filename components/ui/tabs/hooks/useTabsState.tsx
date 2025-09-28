import { useState, useCallback } from "react";
import { TabItem } from "../tabs.type";
import { announceToScreenReader } from "../utils/tabs.utils";

export const useTabsState = (
  tabs: TabItem[],
  controlledValue?: string,
  onValueChange?: (value: string) => void,
  defaultValue?: string,
  disabled?: boolean
) => {
  const [internalValue, setInternalValue] = useState(() => defaultValue || tabs[0]?.id || "");

  const value = controlledValue ?? internalValue;
  const isControlled = controlledValue !== undefined;

  const handleTabChange = useCallback(
    (tabId: string) => {
      const tab = tabs.find((t) => t.id === tabId);
      if (tab?.disabled || disabled) return;

      if (!isControlled) {
        setInternalValue(tabId);
      }

      onValueChange?.(tabId);
      announceToScreenReader(`${tab?.label} tab selected`);
    },
    [tabs, disabled, isControlled, onValueChange]
  );

  return { value, handleTabChange };
};
