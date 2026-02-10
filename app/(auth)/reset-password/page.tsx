import { Icons } from "@/components/Icons";
import Link from "next/link";
import DotLmsLogo from "@/components/Logo";
import { InfoSection } from "@/features/auth/components/InfoSection";
import ResetPasswordForm from "@/features/auth/components/form/Reset";
import { Suspense } from "react";

const forgotPageInfo = {
  title: "Forgot Your Password?",
  subTitle: "No worries! We can help you reset your password and get back on track quickly.",
  moto: "We value the security of your account. Follow the steps below to reset your password and regain access to your account.",
};

export default async function ResetPasswordPage() {
  return (
    <>
      <InfoSection pageInfo={forgotPageInfo} />

      <div className="flex h-screen flex-col items-center justify-center space-y-4 rounded-tl-3xl bg-white p-8 shadow-lg md:w-1/2 md:rounded-none lg:w-1/2 xl:w-3/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center space-x-2">
            <DotLmsLogo />
          </div>
          <h2 className="mt-6 text-center text-xl/9 font-bold tracking-tight text-gray-600/80">
            Reset your password?
          </h2>
        </div>

        <div className="mt-2 w-full sm:mx-auto sm:w-full sm:max-w-sm">
          <Suspense fallback={
            <div className="mx-auto mt-8 max-w-md">
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          }>
            <ResetPasswordForm />
          </Suspense>

          <div className="mt-3 text-right">
            <div className="text-sm">
              <Link
                href="/login"
                className="inline-flex items-center space-x-2 font-medium text-gray-600 hover:text-gray-500"
              >
                <Icons.login className="h-4 w-4 text-gray-500" />
                <span>Back to Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
