"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useForgetActions } from "../../hooks/useForgetActions";

type ResetPasswordFormData = {
    newPassword: string;
    confirmPassword: string;
};

export default function ResetPasswordForm() {
    const router = useRouter();
    const { reset, loading } = useForgetActions();
    const { handleApiErrors } = useHandleApiErrors<ResetPasswordFormData>();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitSuccessful },
        watch,
    } = useForm<ResetPasswordFormData>({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
    });

    const newPassword = watch("newPassword");

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (data.newPassword !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Passwords do not match",
            });
            return;
        }
        if (!token) {
            setError("root", {
                type: "manual",
                message: "Invalid token. Please try resetting your password again.",
            });
            return;
        }
        const res = await reset(data.confirmPassword, token);
        if (res && !res.success) {
            handleApiErrors(res.response, setError);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-md">
            {errors.root?.message && (
                <p className="text-red-500 text-center bg-red-50 border border-red-100 rounded-lg p-2 mb-4">
                    {errors.root.message}
                </p>
            )}

            {isSubmitSuccessful ? (
                <div className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-4 shadow-sm">
                    <div className="mb-4">
                        <svg
                            className="w-16 h-16 mx-auto text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Password Reset Successful!
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Your password has been successfully reset.
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        You can now login with your new password.
                    </p>
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <label
                            htmlFor="newPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            New Password
                        </label>
                        <Input
                            id="newPassword"
                            placeholder="Enter new password"
                            type="password"
                            className="mt-1"
                            {...register("newPassword", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters",
                                },
                            })}
                            error={errors.newPassword?.message}
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>
                        <Input
                            id="confirmPassword"
                            placeholder="Confirm new password"
                            type="password"
                            className="mt-1"
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: (value) =>
                                    value === newPassword || "Passwords do not match",
                            })}
                            error={errors.confirmPassword?.message}
                        />
                    </div>

                    <SubmitButton disabled={loading} idleText="Reset Password" />
                </>
            )}
        </form>
    );
}