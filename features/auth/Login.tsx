import Link from "next/link";
import { InfoSection } from "@/features/auth/components/InfoSection";
import DotLmsLogo from "@/components/Logo";
import { loginPageInfo } from "@/features/auth/data";
import { LoginForm } from "@/features/auth/components/form/LoginFrom";
import { authConfig } from "@/features/auth/config";

export default function Login() {
  return (
    <>
      <InfoSection pageInfo={loginPageInfo} />

      <div className="flex h-screen flex-col items-center justify-center space-y-4 rounded-tl-3xl bg-white p-8 shadow-lg md:w-1/2 md:rounded-none lg:w-1/2 xl:w-3/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center space-x-2">
            <DotLmsLogo />
          </div>
          <h2 className="mt-6 text-center text-xl/9 font-bold tracking-tight text-gray-600/80">
            Login to your account
          </h2>
        </div>

        <div className="mt-2 w-full sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />

          {authConfig.registrationEnabled && (
            <p className="mt-10 text-center text-xs/5 text-slate-500">
              New to E-FakeFilter?
              <Link
                href="/registration"
                className="block font-semibold text-slate-600 underline hover:text-slate-700"
              >
                Create an account
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
