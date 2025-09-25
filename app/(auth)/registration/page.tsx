import Link from "next/link";
import { InfoSection } from "../_components/InfoSection";
import RegistrationForm from "../_components/form/Registration";
import DotLmsLogo from "@/components/Logo";

const registerPageInfo = {
  title: "Join the Learning Community",
  subTitle:
    "Register now to unlock a world of educational opportunities. Gain access to courses, track your progress, and connect with instructors.",
  moto: "Start your journey towards success with knowledge and opportunities that empower your learning.",
};

export default function LoginPage() {
  return (
    <>
      <InfoSection pageInfo={registerPageInfo} />

      {/* Right Section */}
      <div className="flex h-screen flex-col items-center justify-center space-y-4 rounded-tl-3xl bg-white p-8  shadow-lg md:h-auto md:w-1/2 md:rounded-none lg:w-1/2 xl:w-3/5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex items-center justify-center space-x-2">
            <DotLmsLogo />
          </div>
          <h2 className="mt-6 text-center text-xl/9 font-bold tracking-tight text-gray-600/80">
            Create Your Account
          </h2>
        </div>

        <div className="mt-10 w-full  sm:mx-auto sm:w-full sm:max-w-sm">
          <RegistrationForm />

          <p className="mt-6 text-center text-xs/5 text-slate-500">
            Already have an account?
            <Link
              href="/login"
              className="block font-semibold text-slate-600 underline hover:text-slate-700"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
