import { Skeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";

type TableSkeletonProps = {
  columns?: number;
  rowCount?: number;
};

export function TableSkeleton({ columns = 4, rowCount = 4 }: TableSkeletonProps) {
  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          {Array.from({ length: rowCount }).map((_, idx) => (
            <TableHead key={idx}>
              <Skeleton className="h-4 w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="bg-white text-black">
        {Array.from({ length: rowCount }).map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {Array.from({ length: columns }).map((_, colIdx) => (
              <TableCell key={colIdx}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
