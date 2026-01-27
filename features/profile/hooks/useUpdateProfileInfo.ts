"use client";

import { useRouter } from "next/navigation";
import { updatePassword, updateUserProfile } from "@/api/profile";
import { toast } from "sonner";

export const useUpdateProfileInfo = () => {
  const router = useRouter();

  const userProfile = async (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    about: string,
    bio: string,
    professional_experience: string,
    professional_experience_details: string,
    avatar_url: string,
    social_links: any,
    setLoading: (loading: boolean) => void,
    setIsOpen: (isOpen: boolean) => void
  ) => {
    setLoading(true);
    try {
      const res = await updateUserProfile(
        firstName,
        lastName,
        email,
        phone,
        about,
        bio,
        professional_experience,
        professional_experience_details,
        avatar_url,
        social_links
      );

      if (res.status === "success") {
        toast.success("Profile updated successfully", {
          style: { color: "green" },
        });

        router.push("/dashboard/profile");
      }
      setIsOpen(false);
      return { success: true };
    } catch (err: any) {
      const apiResponse = err || { message: "Profile update failed" };
      return {
        success: false,
        response: {
          message: apiResponse.message,
          errors: apiResponse.errors,
        },
      };
    } finally {
      setLoading(false);
      // setIsOpen(false);
    }
  };

  const PasswordChange = async (oldPassword: string, newPassword: string) => {
    //setLoading(true);
    try {
      const res = await updatePassword(oldPassword, newPassword);
      if (res.status === "success") {
        toast.success("Password updated successfully", {
          style: { color: "green" },
        });
      }
      return { success: true };
    } catch (err: any) {
      const apiResponse = err || { message: "Password update failed" };
      return {
        success: false,
        response: {
          message: apiResponse.message,
          errors: apiResponse.errors,
        },
      };
    } finally {
      // setLoading(false);
    }
  };

  return { userProfile, PasswordChange };
};
