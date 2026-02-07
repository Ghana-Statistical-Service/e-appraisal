"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Header } from "./components/header";
import { MobileHeader } from "./components/mobile-header";
import { Sidebar } from "./components/sidebar";
import { SidebarProvider } from "./components/sidebar/SidebarProvider";

export default function App({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Mock user data - in a real app, this would come from authentication
  const currentUser = {
    name: "Isaac Odoom",
    role: "hr" as const, // Change to "sectional_head", "director", or "hr" to see different views
  };

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="hidden lg:block">
          <Header userName={currentUser.name} userRole={getRoleLabel(currentUser.role)} />
        </div>
        <MobileHeader />
        <Sidebar userRole={currentUser.role} />
        <main className="bg-gray-100 pt-14 lg:pt-16 lg:pl-72">
          <div className="max-w-7xl mx-auto p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

function getRoleLabel(role: string): string {
  const roleLabels: Record<string, string> = {
    staff: "Staff",
    sectional_head: "Sectional Head",
    director: "Director",
    hr: "HR Director",
  };
  return roleLabels[role] || "Staff";
}
