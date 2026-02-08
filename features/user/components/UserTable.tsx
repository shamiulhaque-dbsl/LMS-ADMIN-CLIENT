"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import UserTableAction from "@/features/user/components/UserTableAction";
import { formatDateTime } from "@/lib/utils/date";

export default function UserTable({ userData }: { userData: any[] }) {
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
        {userData?.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>

            <TableCell>
              <Image
                src={user.avatar_url || "/images/noimage.png"}
                alt={`${user.first_name} ${user.last_name}`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
            </TableCell>

            <TableCell>
              {user.first_name} {user.last_name} <span className="capitalize text-blue-500"> ({user.role}) </span>
            </TableCell>

            <TableCell>{user.email}</TableCell>

            <TableCell>{user.phone}</TableCell>

            <TableCell>
              {user.created_at ? formatDateTime(user.created_at) : ""}
            </TableCell>

            <TableCell>
              {user.status === 1 ? (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Active
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                  Inactive
                </span>
              )}
            </TableCell>

            {/* Table action */}
            <TableCell>
              {
                user?.id && <UserTableAction userId={user.id} />
              }

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
