"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import Link from "next/link";
import CategoryTableAction from "./CategoryTableAction";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function CourseTable() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>
            <Link href="#" className="text-blue-600">
              Web Design
            </Link>
          </TableCell>
          <TableCell>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              active
            </span>
          </TableCell>
          {/* Table action */}
          <TableCell>
            <CategoryTableAction />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
