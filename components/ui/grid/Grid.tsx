import React, { ReactNode } from "react";
import clsx from "clsx";

// ===== Types =====
type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;

// ===== Maps =====
const colsMap: Record<GridSize, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
};

const colSpanMap: Record<GridSize, string> = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

const rowSpanMap: Record<GridSize, string> = {
  1: "row-span-1",
  2: "row-span-2",
  3: "row-span-3",
  4: "row-span-4",
  5: "row-span-5",
  6: "row-span-6",
  7: "row-span-7",
  8: "row-span-8",
  9: "row-span-9",
  10: "row-span-10",
  11: "row-span-11",
  12: "row-span-12",
};

const gapMap: Record<GapSize, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
  20: "gap-20",
  24: "gap-24",
  32: "gap-32",
};

// ===== Grid Root =====
type GridProps = {
  children: ReactNode;
  cols?: GridSize;
  gap?: GapSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  className?: string;
};

const GridRoot: React.FC<GridProps> = ({
  children,
  cols = 1,
  gap = 4,
  sm,
  md,
  lg,
  xl,
  className,
}) => {
  const gridClasses = clsx(
    "grid",
    colsMap[cols],
    gapMap[gap],
    sm && `sm:${colsMap[sm]}`,
    md && `md:${colsMap[md]}`,
    lg && `lg:${colsMap[lg]}`,
    xl && `xl:${colsMap[xl]}`,
    className
  );

  return <div className={gridClasses}>{children}</div>;
};

// ===== Grid Item =====
type GridItemProps = {
  children: ReactNode;
  colSpan?: GridSize;
  rowSpan?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  className?: string;
};

const GridItem: React.FC<GridItemProps> = ({
  children,
  colSpan,
  rowSpan,
  sm,
  md,
  lg,
  xl,
  className,
}) => {
  const itemClasses = clsx(
    colSpan && colSpanMap[colSpan],
    rowSpan && rowSpanMap[rowSpan],
    sm && `sm:${colSpanMap[sm]}`,
    md && `md:${colSpanMap[md]}`,
    lg && `lg:${colSpanMap[lg]}`,
    xl && `xl:${colSpanMap[xl]}`,
    className
  );

  return <div className={itemClasses}>{children}</div>;
};

export const Grid = Object.assign(GridRoot, { Item: GridItem });
