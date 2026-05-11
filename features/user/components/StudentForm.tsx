"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Grid } from "@/components/ui/grid";
import { toast } from "sonner";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { createStudent, updateUser } from "@/api/user";
import { Camera } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/features/profile/hooks/uploadImage";
import { useRouter } from "next/navigation";

// Validation schema
const userFormSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  avatar_url: z.string().optional().or(z.literal("")),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  userData?: Partial<UserFormValues> & { id?: string | number }
}

export const StudentForm = ({ userData }: UserFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [profilePicPreview, setProfilePicPreview] = useState<string>("");
  const router = useRouter();
  const { handleApiErrors } = useHandleApiErrors<UserFormValues>();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: userData?.first_name || "",
      last_name: userData?.last_name || "",
      email: userData?.email || "",
      phone: userData?.phone || "",
      avatar_url: userData?.avatar_url || "",
    },
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const UserExist = userData && Object.keys(userData)?.length > 0

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      toast.error("Only JPG, PNG or GIF allowed.", {
        style: { color: "red" },
      });
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1 * 1024 * 1024) {
      toast.error("Max size 1MB", {
        style: { color: "red" },
      });
      return;
    }
    try {
      setIsImageUpload(true);
      const uploadedData = await uploadImage(file);
      if (uploadedData) {
        setProfilePicPreview(uploadedData);
      }

      // Create a blob URL for preview
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    } catch (err) {
      toast.error("Failed to upload image", {
        style: { color: "red" },
      });
      console.error("Upload error:", err);
      return null;
    } finally {
      setIsImageUpload(false);
    }
  };


  // Reset form when userData changes
  useEffect(() => {
    if (userData) {
      reset({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        avatar_url: userData.avatar_url || "",
      });
    }
  }, [userData, reset]);


  // Show toast when error appears
  // useEffect(() => {
  //   if (errors?.root?.message) {
  //     toast.error(errors.root.message, {
  //       style: { color: "red" },
  //     });
  //   }
  // }, [errors?.root?.message]);

  const handleFormSubmit = async (data: UserFormValues) => {
    setIsLoading(true);

    const payload = {
      ...data,
      name: `${data.first_name} ${data.last_name}`,
      avatar: profilePicPreview,
      avatar_url: profilePicPreview || data.avatar_url,
    };

    try {
      if (UserExist && userData?.id) {
        const res = await updateUser(payload, userData.id as number)
        if (res?.success) {
          toast.success(res?.message || "Student Updated Successfully")
          router.refresh();
        }
        if (res && !res.success) {
          handleApiErrors(res, setError);
        }
      } else {
        const res = await createStudent(payload)
        if (res?.success) {
          toast.success(res?.message || "Student Created Successfully")
          reset();
        }
        if (res && !res.success) {
          handleApiErrors(res, setError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errors.root?.message) {
      const element = document.getElementById("rootError");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (errors.phone) {
      const element = document.getElementById("phone");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    else if (errors.email) {
      const element = document.getElementById("email");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [errors?.root?.message, errors?.phone, errors?.email]);

  return (
    <div className="w-full">
      {errors.root?.message && (
        <p id="rootError" className="my-2 rounded-md bg-red-50 p-4 text-center text-red-500">
          {errors?.root?.message}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="lg:grid grid-cols-3 gap-20">
          <div className="col-span-2">
            <Grid cols={2} gap={4}>
              <div>
                <Input
                  id="first_name"
                  label="First Name"
                  required
                  {...register("first_name")}
                  error={errors.first_name?.message}
                />
              </div>
              <div>
                <Input
                  id="last_name"
                  label="Last Name"
                  required
                  {...register("last_name")}
                  error={errors.last_name?.message}
                />
              </div>
              <div>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  required
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>
              <div>
                <Input
                  id="phone"
                  label="Phone"
                  required
                  {...register("phone")}
                  error={errors.phone?.message}
                />
              </div>
            </Grid>
          </div>

          <div className="flex items-center space-x-4">
            {isImageUpload ? (
              <div className="rounded-full w-20 h-20 bg-gray-200 animate-pulse border"></div>
            ) : (
              <>
                {userData?.avatar_url || avatarPreview || profilePicPreview ? (
                  <div className="flex flex-col gap-1">
                    <Image
                      src={profilePicPreview || userData?.avatar_url || avatarPreview}
                      alt={"user image"}
                      width={170}
                      height={170}
                      className="rounded-full w-20 h-20 border"
                    />
                  </div>
                ) : (
                  <Image
                    src="/images/noimage.png"
                    alt={"user image"}
                    width={170}
                    height={170}
                    className="rounded-full w-20 h-20 border"
                  />
                )}
              </>
            )}

            {/* File Input */}
            <input
              ref={fileInputRef}
              disabled={isImageUpload}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <div
              className={`flex flex-col gap-3 border border-dashed rounded w-40 p-2 ${isImageUpload && "animate-pulse bg-gray-200"
                }`}
            >
              <Button
                onClick={handleAvatarClick}
                type="button"
                variant="outline"
                size="sm"
              >
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
              <p className="mt-1 text-xs text-gray-500">
                Only JPG, PNG or GIF allowed. Max size 2MB.
              </p>
            </div>
          </div>
        </div>

        <div className="flex  space-x-3 border-t pt-6">
          <Button
            disabled={isLoading || isImageUpload}
            variant="outline"
            type="submit"
          >
            {isLoading ? "Saving..." : UserExist ? "Update Student" : "Create Student"}
          </Button>
        </div>
      </form>
    </div>
  );
};

StudentForm.displayName = "StudentForm";