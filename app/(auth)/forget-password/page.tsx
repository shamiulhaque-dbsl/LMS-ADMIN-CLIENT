import { Icons } from "@/components/Icons";
import { InfoSection } from "../_components/InfoSection";
import { ForgotPasswordForm } from "../_components/form/password/Forgot";
import Link from "next/link";
import DotLmsLogo from "@/components/Logo";

const forgotPageInfo = {
  title: "Forgot Your Password?",
  subTitle: "No worries! We can help you reset your password and get back on track quickly.",
  moto: "We value the security of your account. Follow the steps below to reset your password and regain access to your account.",
};

export default async function ForgotPasswordPage() {
  return (
    <>
      <InfoSection pageInfo={forgotPageInfo} />

      <div className="flex h-screen flex-col items-center justify-center space-y-4 rounded-tl-3xl bg-white p-8 shadow-lg md:w-1/2 md:rounded-none lg:w-1/2 xl:w-3/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center space-x-2">
            <DotLmsLogo />
          </div>
          <h2 className="mt-6 text-center text-xl/9 font-bold tracking-tight text-gray-600/80">
            Forgot your password?
          </h2>
        </div>

        <div className="mt-2 w-full sm:mx-auto sm:w-full sm:max-w-sm">
          <ForgotPasswordForm />

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
