import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { SessionProvider } from "@/contexts/auth/SessionContext";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DOTLMS - Learning Management System",
  description: "DOTLMS - Learning Management System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${publicSans.variable} antialiased`} suppressHydrationWarning>
        <SessionProvider>
          <SidebarProvider>
            <div className="flex flex-1 flex-col min-h-screen">
              <AppSidebar />
              <div className="sm:pl-64">
                <AppHeader />
                <main className="flex flex-1 flex-col">
                  <div className="px-4 sm:px-10 pt-6 pb-16">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
