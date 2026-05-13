"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Course } from "@/features/course/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { enrollStudentToCourse, getStudentById } from "@/api/enrollment";
import Image from "next/image";

interface FormData {
  student_id: string;
  course_id: string;
  enrolled_type: "free" | "paid" | "cash" | "scholarship";
}

interface StudentInfo {
  id: number;
  name?: string;
  email?: string;
  avatar_url?: string;
}

interface AddStudentToCourseProps {
  courses: Course[];
}

const inputClasses =
  "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0 focus:border-orange-500 sm:text-sm";
const labelClasses = "block text-sm font-medium text-gray-700 mb-1";
const errorClasses = "text-red-500 text-xs mt-1";

export default function AddStudentToCourse({ courses }: AddStudentToCourseProps) {
  const [studentInfo, setStudentInfo] = useState<StudentInfo | null>(null);
  const [studentError, setStudentError] = useState<string | null>(null);
  const [lookingUp, setLookingUp] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { enrolled_type: "cash" },
  });

  const handleStudentIdChange = (value: string) => {
    setStudentInfo(null);
    setStudentError(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    const id = value.trim();
    if (!id || isNaN(Number(id))) return;

    debounceRef.current = setTimeout(async () => {
      setLookingUp(true);
      try {
        const res = await getStudentById(Number(id));
        if (res.success) {
          setStudentInfo(res.data);
          setStudentError(null);
        } else {
          setStudentError(res.message || "Student not found");
        }
      } catch {
        setStudentError("Student not found");
      } finally {
        setLookingUp(false);
      }
    }, 600);
  };

  const onSubmit = async (data: FormData) => {
    if (!studentInfo) {
      toast.error("Please enter a valid student ID");
      return;
    }
    const result = await enrollStudentToCourse({
      student_id: Number(data.student_id),
      courseId: Number(data.course_id),
      enrolled_type: data.enrolled_type,
      role: "admin",
    });

    if (result.success) {
      toast.success("Student enrolled successfully");
      reset();
      setStudentInfo(null);
      setStudentError(null);
    } else {
      toast.error(result.message || "Failed to enroll student");
    }
  };


  return (
    <Card className="bg-white rounded-xl">
      <Card.Content className="p-6 lg:px-44 lg:py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Enroll Student to Course</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
          {/* Course Selection */}
          <div>
            <label htmlFor="course_id" className={labelClasses}>
              Course <span className="text-red-500">*</span>
            </label>
            <select
              id="course_id"
              {...register("course_id", { required: "Please select a course" })}
              className={inputClasses}
            >
              <option value="">Select a course...</option>
              {courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            {errors.course_id && <p className={errorClasses}>{errors.course_id.message}</p>}
          </div>

          {/* Student ID Input */}
          <div>
            <Input
              id="student_id"
              label="Student ID"
              required
              placeholder="Enter student ID"
              {...register("student_id", {
                required: "Student ID is required",
                validate: (v) => !isNaN(Number(v)) || "Student ID must be a number",
              })}
              onChange={(e) => {
                register("student_id").onChange(e);
                handleStudentIdChange(e.target.value);
              }}
              error={errors.student_id?.message}
            />

            {/* Student info preview */}
            {lookingUp && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-gray-500" />
                Looking up student...
              </div>
            )}
            {studentInfo && !lookingUp && (
              <div className="mt-2 flex items-center gap-3 rounded-md border border-green-200 bg-green-50 px-3 py-2">
                {studentInfo.avatar_url ? (
                  <Image
                    height={100}
                    width={100}
                    src={studentInfo.avatar_url}
                    alt={studentInfo.name || "Student Avatar"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-sm font-semibold text-green-700">
                    {studentInfo.name?.[0]?.toUpperCase() ?? "S"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800">{studentInfo.name}</p>
                  {studentInfo.email && (
                    <p className="text-xs text-gray-500">{studentInfo.email}</p>
                  )}
                </div>
              </div>
            )}
            {studentError && !lookingUp && (
              <p className="mt-2 text-xs text-red-500">{studentError}</p>
            )}
          </div>

          {/* Enrolled Type */}
          <div>
            <label htmlFor="enrolled_type" className={labelClasses}>
              Enrolled Type <span className="text-red-500">*</span>
            </label>
            <select
              id="enrolled_type"
              {...register("enrolled_type", { required: "Please select enrolled type" })}
              className={inputClasses}
            >
              <option value="cash">Cash</option>
              <option value="scholarship">Scholarship</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {errors.enrolled_type && (
              <p className={errorClasses}>{errors.enrolled_type.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="border-t border-gray-200 pt-4">
            <Button
              type="submit"
              variant="default"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enrolling..." : "Enroll Student"}
            </Button>
          </div>
        </form>
      </Card.Content>
    </Card>
  );
}
