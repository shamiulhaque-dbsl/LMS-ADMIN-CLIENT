"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { useUpdateProfileInfo } from "../../hooks/useUpdateProfileInfo";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";

type PasswordChangeFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const PasswordChangeForm = () => {
  const { PasswordChange } = useUpdateProfileInfo();
  const { handleApiErrors } = useHandleApiErrors<PasswordChangeFormValues>();

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PasswordChangeFormValues>();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: PasswordChangeFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }
    const oldPassword = data.currentPassword;
    const newPassword = data.newPassword;
    const res = await PasswordChange(oldPassword, newPassword);

    if (res && !res.success) {
      handleApiErrors(res.response, setError);
    } else {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-6">
      {/* Root error */}
      {errors.root?.message && (
        <p id='rootError' className="text-red-500 text-sm p-3 bg-red-100 rounded border border-red-200 mt-1 mb-3 mx-auto md:w-full">
          {errors.root.message}
        </p>
      )}

      {/* Current Password */}
      <div className="relative">
        <Input
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          error={errors.currentPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowCurrentPassword((p) => !p)}
          className="absolute right-3 top-[35px] text-gray-400"
        >
          {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* New Password */}
      <div className="relative">
        <Input
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            // pattern: {
            //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            //   message: "Must include uppercase, lowercase & number",
            // },
          })}
          error={errors.newPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowNewPassword((p) => !p)}
          className="absolute right-3 top-8 text-gray-400"
        >
          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          label="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((p) => !p)}
          className="absolute right-3 top-8 text-gray-400"
        >
          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Password rules */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">Password Requirements:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• At least 8 characters</li>
          <li>• One uppercase letter</li>
          <li>• One lowercase letter</li>
          <li>• One number</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button type="submit" variant="outline" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
        <Button
          type="button"
          variant="outlineGray"
          onClick={() => reset()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

PasswordChangeForm.displayName = "PasswordChangeForm";
