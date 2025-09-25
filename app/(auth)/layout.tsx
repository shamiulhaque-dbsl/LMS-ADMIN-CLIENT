import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Login or register for E-FakeFilter platform",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-[#F8F8F8] md:flex-row">{children}</div>;
}
