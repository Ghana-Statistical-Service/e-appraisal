"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Award,
  BarChart3,
  Briefcase,
  Calculator,
  CheckCircle,
  CheckSquare,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "./ui/utils";
import { useSidebar } from "./sidebar/SidebarProvider";

interface SidebarProps {
  userRole: "staff" | "sectional_head" | "director" | "hr";
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "my-appraisals", label: "My Appraisals", href: "/appraisals", icon: FileText, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "performance-planning", label: "Performance Planning", href: "/planning", icon: Target, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "mid-year-review", label: "Mid-Year Review", href: "/reviews/mid-year", icon: Activity, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "end-year-review", label: "End-Year Review", href: "/reviews/end-year", icon: CheckSquare, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "competency-assessment", label: "Competency Assessment", href: "/assessments/competency", icon: Award, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "overall-assessment", label: "Overall Assessment", href: "/assessments/overall", icon: Calculator, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "career-development", label: "Career Development", href: "/assessments/career-development", icon: TrendingUp, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "assessment-decision", label: "Assessment Decision", href: "/assessments/decision", icon: Briefcase, roles: ["sectional_head", "director", "hr"] },
    { id: "comments", label: "Comments", href: "/assessments/comments", icon: MessageSquare, roles: ["staff", "sectional_head", "director", "hr"] },
    { id: "approvals", label: "Approvals", href: "/approvals", icon: CheckCircle, roles: ["sectional_head", "director", "hr"] },
    { id: "reports", label: "Reports", href: "/reports", icon: BarChart3, roles: ["hr"] },
    { id: "organization-setup", label: "Organization Setup", href: "/setup", icon: Settings, roles: ["hr"] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(userRole));

  const SidebarHeader = () => (
    <div className="shrink-0">
      <div className="flex items-center gap-3 px-4 py-4 lg:py-0 lg:h-16">
        <img src="/gsslogo.png" alt="GSS logo" className="h-8 w-8" />
        <div className="text-sm">
          <div className="font-semibold leading-4 text-white">Ghana Statistical Service</div>
          <div className="text-xs text-blue-400">E-Appraisal System</div>
        </div>
      </div>
      <div className="hidden lg:block h-px bg-[#2a2d3a]" />
    </div>
  );

  const SidebarFooter = () => <div className="shrink-0" />;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 h-screen overflow-hidden bg-[#1a1d29] border-r border-[#2a2d3a] text-white">
        <div className="flex h-full w-full flex-col overflow-hidden">
          <SidebarHeader />
          <nav
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 pb-4 sidebar-scroll"
            style={{ scrollbarGutter: "stable" }}
          >
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-[#252834] hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <SidebarFooter />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={close}
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
        />
      ) : null}

      {/* Mobile drawer */}
      <aside
        aria-label="Sidebar"
        className={cn(
          "lg:hidden fixed inset-y-0 left-0 z-50 w-72 h-screen overflow-hidden bg-[#1a1d29] border-r border-[#2a2d3a] text-white transform transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col overflow-hidden">
          <SidebarHeader />
          <nav
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 pb-4 sidebar-scroll"
            style={{ scrollbarGutter: "stable" }}
          >
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:bg-[#252834] hover:text-white"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}
