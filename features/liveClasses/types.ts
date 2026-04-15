import { Course, CourseInstructor } from "../course/types";

export interface LiveSession {
  id: number;
  courseId: number;
  batchId: number | null;
  instructorId: number;
  sessionType: SessionType;
  title: string;
  description: string;
  sessionUrl: string;
  startTime: string;
  endTime: string;
  status?: SessionStatus | undefined;
  platform?: SessionPlatform;
  meetingId: string;
  meetingPassword: string;
  externalMetadata: string | null;
  createdAt: string;
  updatedAt: string;
  course: Course;
  batch: Batch | null;
  instructor: CourseInstructor;
}

export type SessionPlatform = "zoom" | "google_meet" | "internal" | "other";

export type SessionType = "demo" | "batch";

export type SessionStatus = "scheduled" | "ongoing" | "completed" | "cancelled";

export interface Batch {
  id: number;
  uuid?: string;
  name?: string;
  startDate?: string;
  endDate?: string;
  status?: "open" | "full" | "closed";
}

export interface LiveClassFormData {
  courseId: number;
  batchId?: number | null;
  sessionType: "demo" | "batch";
  title: string;
  description: string;
  sessionUrl: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  platform: "zoom" | "google-meet" | "other";
  meetingId: string;
  meetingPassword: string;
  externalMetadata: string;
}
