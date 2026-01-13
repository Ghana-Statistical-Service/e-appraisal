"use client";

import { useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  userName: string;
  userRole: string;
}

export function Header({ userName, userRole }: HeaderProps) {
  return (
    <header className="h-16 bg-[#1a1d29] border-b border-[#2a2d3a] text-white flex items-center justify-between px-6 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center">
            <img
              src="/gsslogo.png"
              alt="GSS logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-white font-semibold">Ghana Statistical Service</h1>
            <p className="text-blue-400 text-sm">E-Appraisal System</p>
          </div>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-white hover:bg-[#252834] gap-2">
            <div className="text-right">
              <div>{userName}</div>
              <div className="text-xs text-gray-400">{userRole}</div>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-[#1a1d29] border-[#2a2d3a] text-white">
          <DropdownMenuItem className="text-gray-300 hover:bg-[#252834] hover:text-white focus:bg-[#252834] focus:text-white">
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-400 hover:bg-[#252834] hover:text-red-300 focus:bg-[#252834] focus:text-red-300">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
