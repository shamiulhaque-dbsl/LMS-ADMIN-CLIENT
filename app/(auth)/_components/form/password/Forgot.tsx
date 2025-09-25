"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export function ForgotPasswordForm() {
  return (
    <form className="mx-auto mt-8 max-w-md">
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input
          id="email"
          name="email"
          placeholder="example@gmail.com"
          type="email"
          autoComplete="email"
          className="mt-1"
          required
        />
      </div>
      <SubmitButton />
    </form>
  );
}
