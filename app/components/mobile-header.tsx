"use client";

import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./sidebar/SidebarProvider";

export function MobileHeader() {
  const { toggle } = useSidebar();

  return (
    <header className="lg:hidden sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-[#2a2d3a] bg-[#1a1d29] px-4 text-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        aria-label="Open sidebar"
        className="text-white hover:bg-[#252834]"
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className="flex items-center gap-2">
        <img src="/gsslogo.png" alt="GSS logo" className="h-7 w-7" />
        <div className="text-sm">
          <div className="font-semibold leading-4">Ghana Statistical Service</div>
          <div className="text-xs text-blue-400">E-Appraisal System</div>
        </div>
      </div>
    </header>
  );
}
