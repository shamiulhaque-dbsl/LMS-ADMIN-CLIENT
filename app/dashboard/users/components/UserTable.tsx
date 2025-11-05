"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import UserTableAction from "@/dashboard/users/components/UserTableAction";

export default function UserTable() {
  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Photo</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Photo</TableCell>
          <TableCell>Rahim</TableCell>
          <TableCell>rahim@gmail.com</TableCell>
          <TableCell>01892*****</TableCell>
          <TableCell>2023-01-01</TableCell>
          <TableCell>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
              active
            </span>
          </TableCell>
          {/* Table action */}
          <TableCell>
            <UserTableAction />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
