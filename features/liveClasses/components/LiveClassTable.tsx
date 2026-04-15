import { use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import Link from "next/link";
import { EmptyList } from "@/components/EmptyList";
import { formatDateFull, formatDateTime } from "@/lib/utils/date";
import { LiveSession } from "../types";
import LiveClassesTableAction from "./LiveClassesTableAction";
import { Minus } from "lucide-react";

/*
  # TODO:
  1. Implement pagination
  2. Handle status dynamically with reuseable component
*/
type CourseProps = {
  fetchLiveClasses: () => Promise<LiveSession[] | []>;
};

export default function LiveClassTable({ fetchLiveClasses }: CourseProps) {
  const courses = use(fetchLiveClasses());

  if (!courses || courses?.length === 0) return <EmptyList title="No courses found" />;

  return (
    <Table className="overflow-y-clip bg-white">
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Course Name</TableHead>
          <TableHead>Created_On</TableHead>
          <TableHead>Start Time – End Time</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>meetingId</TableHead>
          <TableHead>Password</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="bg-white text-black">
        {courses.map((session, index) => (
          <TableRow key={session.id}>
            <TableCell>{++index}</TableCell>
            <TableCell>
              <Link
                href={`/dashboard/courses/live-classes/${session.id}/edit`}
                target="_blank"
                prefetch={false}
                className="text-blue-600"
              >
                {session?.title}
              </Link>
            </TableCell>
            <TableCell>{session?.course?.title}</TableCell>
            <TableCell>
              <span className="text-gray-600">
                {session?.createdAt && formatDateFull(session.createdAt)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-gray-600">
                {session?.startTime && formatDateTime(session.startTime)} {session?.startTime && <Minus size={18} className="inline" />}  {session?.endTime && formatDateTime(session.endTime)}
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                {session?.platform}
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                {session?.meetingId}
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                {session?.meetingPassword}
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
                {session?.status}
              </span>
            </TableCell>
            <TableCell>
              <LiveClassesTableAction session={session} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
