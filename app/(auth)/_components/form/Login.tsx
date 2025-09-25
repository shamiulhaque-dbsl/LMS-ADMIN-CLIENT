"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";

const LoginForm = () => {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <form className="transform space-y-4 transition-all duration-300 ease-in-out">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            placeholder="example@gmail.com"
            type="email"
            autoComplete="email"
            className="mt-1"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <Input
            id="password"
            name="password"
            placeholder="****"
            type="password"
            autoComplete="current-password"
            className="mt-1"
          />
        </div>

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

export default LoginForm;
