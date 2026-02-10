"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useForgetActions } from "../../hooks/useForgetActions";
import { useHandleApiErrors } from "@/hooks/useHandleApiErrors";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

type ForgetFormData = { email: string };

export function ForgotPasswordForm() {
    const { forget, loading } = useForgetActions();
    const { handleApiErrors } = useHandleApiErrors<ForgetFormData>();
    const countTime = 60  // 60 seconds 
    const [timeLeft, setTimeLeft] = useState(countTime);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        setError,
        watch,
        reset,
    } = useForm<ForgetFormData>({
        defaultValues: { email: "" },
    });

    useEffect(() => {
        if (isSubmitSuccessful && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }


        if (isSubmitSuccessful && timeLeft === 0) {
            reset();
            setTimeLeft(countTime);
        }
    }, [isSubmitSuccessful, timeLeft, reset]);

    const onSubmit = async (data: ForgetFormData) => {
        const res = await forget(data.email);

        if (res && !res.success) {
            handleApiErrors(res.response, setError);
        } else {
            setTimeLeft(countTime);
        }
    };


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-4 max-w-md">
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
                        Reset Link Sent!
                    </h3>
                    <p className="text-gray-600 mb-4">
                        We&apos;ve sent a password reset link to
                    </p>
                    <p className="font-medium text-gray-800 mb-4">
                        {watch("email")}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        Please check your inbox and follow the instructions.
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                        <p className="text-sm text-gray-600 mb-2">
                            Page will reset in:
                        </p>
                        <div className="text-3xl font-bold text-green-600">
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            placeholder="example@gmail.com"
                            type="email"
                            autoComplete="email"
                            className="mt-1"
                            required
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            error={errors.email?.message}
                        />
                    </div>
                    <SubmitButton disabled={loading} idleText="Send Reset Link" />
                </>
            )}
        </form>
    );
}