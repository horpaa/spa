"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";
import {
  LayoutDashboard,
  Sparkles,
  CreditCard,
  Users,
  CalendarDays,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const navItems = [
  {
    group: "Resumen",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    group: "Gestión",
    items: [
      { label: "Servicios", href: "/admin/services", icon: Sparkles },
      { label: "Citas", href: "/admin/appointments", icon: CalendarDays },
      { label: "Pagos", href: "/admin/payments", icon: CreditCard },
      { label: "Usuarios", href: "/admin/users", icon: Users },
    ],
  },
  {
    group: "Sistema",
    items: [
      { label: "Configuración", href: "/admin/settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();

  return (
    <aside className="w-60 bg-[#1A1A1A] flex flex-col h-screen fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full border border-[#C4956A] flex items-center justify-center">
            <span className="text-[#C4956A] text-xs font-playfair font-bold">A</span>
          </div>
          <div className="leading-tight">
            <span className="font-playfair text-sm font-semibold text-white">Ariday</span>
            <p className="text-[9px] text-[#C4956A] tracking-widest uppercase -mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navItems.map((group) => (
          <div key={group.group} className="mb-5">
            <p className="text-[10px] text-white/30 uppercase tracking-widest font-medium px-2 mb-1.5">
              {group.group}
            </p>
            {group.items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium mb-0.5 transition-colors group ${
                    active
                      ? "bg-[#C4956A] text-white"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <Icon size={16} className={active ? "text-white" : "text-white/50 group-hover:text-white/80"} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-white transition-colors rounded-sm hover:bg-white/8"
        >
          <ExternalLink size={15} />
          Ver Sitio
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/50 hover:text-red-400 transition-colors rounded-sm hover:bg-white/8"
        >
          <LogOut size={15} />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}
