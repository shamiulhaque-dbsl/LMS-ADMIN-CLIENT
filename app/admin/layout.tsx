import AppHeader from "@/components/layout/app-header";
import AppSidebar from "@/components/layout/app-sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { SessionProvider } from "@/contexts/auth/SessionContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <div className="flex min-h-screen flex-1 flex-col">
          <AppSidebar />
          <div className="sm:pl-64">
            <AppHeader />
            <main className="flex flex-1 flex-col">
              <div className="px-4 pb-16 pt-6 sm:px-10">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
}
