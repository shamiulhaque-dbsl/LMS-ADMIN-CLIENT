import { TabItem } from "../tabs.type";
import { VARIANT_CLASSES, SIZE_CLASSES } from "../tabs.constants";

export const announceToScreenReader = (message: string): void => {
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("aria-atomic", "true");
  announcer.className = "sr-only";
  announcer.textContent = message;
  document.body.appendChild(announcer);
  setTimeout(() => document.body.removeChild(announcer), 1000);
};

export const findNextValidTabIndex = (
  tabs: TabItem[],
  currentIndex: number,
  direction: "next" | "prev" | "first" | "last"
): number => {
  let newIndex = currentIndex;

  switch (direction) {
    case "next":
      newIndex = (currentIndex + 1) % tabs.length;
      break;
    case "prev":
      newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      break;
    case "first":
      newIndex = 0;
      break;
    case "last":
      newIndex = tabs.length - 1;
      break;
  }

  // Skip disabled tabs
  let attempts = 0;
  while (tabs[newIndex]?.disabled && attempts < tabs.length) {
    newIndex =
      direction === "next" || direction === "first"
        ? (newIndex + 1) % tabs.length
        : newIndex === 0
          ? tabs.length - 1
          : newIndex - 1;
    attempts++;
  }

  return tabs[newIndex]?.disabled ? currentIndex : newIndex;
};

export const getTabClasses = (
  isActive: boolean,
  variant: keyof typeof VARIANT_CLASSES,
  size: keyof typeof SIZE_CLASSES,
  orientation: "horizontal" | "vertical",
  fullWidth: boolean,
  tabClassName: string,
  activeTabClassName: string
): string => {
  const variantClass = VARIANT_CLASSES[variant];
  const sizeClass = SIZE_CLASSES[size];

  let classes = `${variantClass.base} ${sizeClass}`;

  if (isActive) {
    classes += ` ${variantClass.active} ${activeTabClassName}`;
  } else {
    classes += ` ${variantClass.inactive}`;
  }

  if (fullWidth && orientation === "horizontal") {
    classes += " flex-1";
  }

  if (orientation === "vertical") {
    classes += " w-full justify-start text-left";
  }

  classes += ` ${tabClassName}`;

  return classes.trim();
};
