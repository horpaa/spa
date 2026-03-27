"use client";

import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  title: string;
  subtitle?: string;
}

export default function AdminTopbar({ title, subtitle }: Props) {
  return (
    <div className="h-16 bg-white border-b border-[#E2D9CF] flex items-center justify-between px-6 sticky top-0 z-30">
      <div>
        <h1 className="font-playfair text-lg font-semibold text-[#1A1A1A] leading-none">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-[#9A9A9A] mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-[#F8F5F0] border border-[#E2D9CF] px-3 py-2 w-52">
          <Search size={14} className="text-[#9A9A9A]" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-xs text-[#1A1A1A] outline-none w-full placeholder:text-[#9A9A9A]"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center border border-[#E2D9CF] hover:border-[#C4956A] transition-colors">
          <Bell size={16} className="text-[#6B6B6B]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C4956A]" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b9e0?w=100&auto=format&fit=crop&crop=face" />
            <AvatarFallback className="bg-[#C4956A] text-white text-xs">AD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-[#1A1A1A] leading-none">Admin</p>
            <p className="text-[10px] text-[#9A9A9A]">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}
