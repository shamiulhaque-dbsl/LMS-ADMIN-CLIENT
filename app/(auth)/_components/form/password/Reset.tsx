"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export default function ResetPasswordForm() {
  return (
    <form className="mx-auto mt-8 max-w-md">
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <Input
          id="newPassword"
          name="newPassword"
          placeholder="New Password"
          type="password"
          className="mt-1"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className="mt-1"
          required
        />
      </div>

      <SubmitButton idleText="Reset Password" />
    </form>
  );
}
