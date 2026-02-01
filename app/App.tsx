"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

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
    <div className="min-h-screen bg-gray-100">
      <Header userName={currentUser.name} userRole={getRoleLabel(currentUser.role)} />
      <Sidebar userRole={currentUser.role} />
      <main className="ml-64 mt-16 p-8 bg-gray-100">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
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
