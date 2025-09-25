"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { EyeOff, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

export const PasswordChangeForm = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    alert("Password changed successfully!");
  };

  return (
    <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
      <div className="relative">
        <Input
          label="Current Password"
          type={showCurrentPassword ? "text" : "password"}
          name="currentPassword"
          value={passwordForm.currentPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
        >
          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          name="newPassword"
          value={passwordForm.newPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)}
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
        >
          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <div className="relative">
        <Input
          label="Confirm New Password"
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          value={passwordForm.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-900">Password Requirements:</h4>
        <ul className="space-y-1 text-sm text-blue-800">
          <li>• At least 8 characters long</li>
          <li>• Contains uppercase letter (A-Z)</li>
          <li>• Contains lowercase letter (a-z)</li>
          <li>• Contains at least one number (0-9)</li>
        </ul>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" type="submit">
          Update Password
        </Button>
        <Button
          type="button"
          variant="outlineGray"
          onClick={() =>
            setPasswordForm({
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            })
          }
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
