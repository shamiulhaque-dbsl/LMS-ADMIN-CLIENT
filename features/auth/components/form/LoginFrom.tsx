"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { useLoginActions } from "@/features/auth/hooks/useLoginActions";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import Link from "next/link";

type LoginFormData = { email: string; password: string };

export const LoginForm = () => {
  const { login, loading } = useLoginActions();
  const { handleApiErrors } = useHandleApiErrors<LoginFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const res = await login(data.email, data.password);
    if (res && !res.success) {
      handleApiErrors(res.response, setError);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="transform space-y-4 transition-all duration-300 ease-in-out"
    >
      {errors.root?.message && <p className="text-red-500 text-center">{errors.root.message}</p>}

      <Input
        id="email"
        label="Email"
        placeholder="example@gmail.com"
        type="email"
        autoComplete="email"
        className="mt-1"
        {...register("email", {
          required: "Email is required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
        })}
        error={errors.email?.message}
      />

      <Input
        id="password"
        label="Password"
        placeholder="****"
        type="password"
        autoComplete="current-password"
        className="mt-1"
        {...register("password", { required: "Password is required" })}
        error={errors.password?.message}
      />

      <div className="text-right text-xs">
        <Link href="/forget-password" className="font-semibold text-gray-600 hover:text-gray-800">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" variant="secondary" size="md" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

LoginForm.displayName = "LoginForm";
