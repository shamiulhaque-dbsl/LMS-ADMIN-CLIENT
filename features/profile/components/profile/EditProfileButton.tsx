"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { X, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { EditProfileButtonProps, ProfileForm } from "../../types";
import { useUpdateProfileInfo } from "../../hooks/useUpdateProfileInfo";
import Image from "next/image";
import { uploadImage } from "@/features/profile/hooks/uploadImage";
import { toast } from "sonner";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />
        <div className="relative my-8 w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button onClick={onClose}>
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

/* ===== Component ===== */

export const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [profilePicPreview, setProfilePicPreview] = useState<string>("");

  const { userProfile } = useUpdateProfileInfo();
  const { handleApiErrors } = useHandleApiErrors<ProfileForm>();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<ProfileForm>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      about: "",
      bio: "",
      professional_experience: "",
      professional_experience_details: "",
      social_links: {
        linkedin: "",
        github: "",
        twitter: "",
      },
    },
  });

  // Reset form when user data loads or changes
  useEffect(() => {
    if (user) {
      // Parse social_links if it's a JSON string
      let socialLinks = { linkedin: "", github: "", twitter: "" };

      if (user.socialLinks) {
        try {
          socialLinks = typeof user.socialLinks === 'string'
            ? JSON.parse(user.socialLinks)
            : user.socialLinks;
        } catch (error) {
          console.error("Error parsing social_links:", error);
        }
      }

      reset({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        about: user.about ?? "",
        bio: user.bio ?? "",
        professional_experience: user.professionalExperience ?? "",
        professional_experience_details: user.professionalExperienceDetails ?? "",
        social_links: {
          linkedin: socialLinks.linkedin ?? "",
          github: socialLinks.github ?? "",
          twitter: socialLinks.twitter ?? "",
        },
      });
    }
  }, [user, reset]);


  useEffect(() => {
    if (errors?.root?.message) {
      document.getElementById("rootError")?.scrollIntoView();
      // toast.error(errors.root.message, {
      //   style: { color: "red" },
      // });
    }
  }, [errors?.root?.message]);

  const handleProfileUpdate = async (data: ProfileForm) => {
    setLoading(true);

    const payload = {
      ...data,
      social_links: JSON.stringify(data.social_links),
    };

    const res = await userProfile(
      payload.firstName,
      payload.lastName,
      payload.email,
      payload.phone,
      payload.about,
      payload.bio,
      payload.professional_experience,
      payload.professional_experience_details,
      profilePicPreview ? profilePicPreview : "",
      payload.social_links,
      setLoading,
      setIsOpen
    );

    if (res && !res.success) {
      handleApiErrors(res.response, setError);
    }
  };


  return (
    <>
      <Button variant="outline" size="md" onClick={() => setIsOpen(true)}>
        Edit Profile
      </Button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setAvatarPreview("");
            clearErrors();
          }}
          title="Edit Profile"
        >
          {errors?.root?.message && (
            <p
              id="rootError"
              className="text-red-500 text-sm p-3 bg-red-100 rounded border border-red-200 mt-1 mb-3 mx-auto md:w-full"
            >
              {errors.root.message}
            </p>
          )}
          <form onSubmit={handleSubmit(handleProfileUpdate)} className="space-y-6">
            <div className="flex items-center space-x-4">
              {isImageUpload ? (
                <div className="rounded-full w-20 h-20 bg-gray-200 animate-pulse border"></div>
              ) : (
                <>
                  {user.avatarUrl || avatarPreview || profilePicPreview ? (
                    <div className="flex flex-col gap-1">
                      <Image
                        src={profilePicPreview || user.avatarUrl || avatarPreview}
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

            {/* Name */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="First Name"
                {...register("firstName", { required: "First name is required" })}
                error={errors.firstName?.message}
              />
              <Input
                label="Last Name"
                {...register("lastName", { required: "Last name is required" })}
                error={errors.lastName?.message}
              />
            </div>

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />

            {/* Phone */}
            <Input label="Phone Number" {...register("phone")} />

            <div className="space-y-3">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Others Information
              </h3>
              <Input label="About" {...register("about")} />

              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  {...register("bio")}
                  rows={3}
                  placeholder="Tell us about yourself..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Input label="Professional_Experience" {...register("professional_experience")} />

              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Experience Details</label>
                <textarea
                  {...register("professional_experience_details")}
                  rows={3}
                  placeholder="Professional experience details..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Social Media Links
              </h3>
              <div className="space-y-4">
                <Input
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/yourprofile"
                  {...register("social_links.linkedin")}
                />
                <Input
                  label="GitHub"
                  placeholder="https://github.com/yourusername"
                  {...register("social_links.github")}
                />
                <Input
                  label="Twitter"
                  placeholder="https://twitter.com/yourhandle"
                  {...register("social_links.twitter")}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 border-t pt-6">
              <Button
                type="button"
                variant="outlineGray"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading || isImageUpload}
                variant="outline"
                type="submit"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

EditProfileButton.displayName = "EditProfileButton";