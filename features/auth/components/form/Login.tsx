"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

export const LoginForm = () => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <form className="transform space-y-4 transition-all duration-300 ease-in-out">
        <Input
          id="email"
          label="Email"
          name="email"
          placeholder="example@gmail.com"
          type="email"
          autoComplete="email"
          className="mt-1"
        />

        <Input
          id="password"
          label="Password"
          name="password"
          placeholder="****"
          type="password"
          autoComplete="current-password"
          className="mt-1"
        />

        <div className="text-right text-xs">
          <Link href="/forget-password" className="font-semibold text-gray-600 hover:text-gray-800">
            Forgot password?
          </Link>
        </div>

        <SubmitButton idleText="Sign in" />
      </form>
    </div>
  );
};

LoginForm.displayName = "LoginForm";
