"use client";

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

interface SidebarProps {
  userRole: "staff" | "sectional_head" | "director" | "hr";
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname();
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

  return (
    <aside className="w-64 bg-[#1a1d29] border-r border-[#2a2d3a] text-white fixed left-0 top-16 bottom-0 overflow-y-auto">
      <nav className="p-4 space-y-2">
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
    </aside>
  );
}
