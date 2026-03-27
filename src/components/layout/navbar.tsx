"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Phone, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/lib/stores/auth-store";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/about" },
  { label: "Servicios", href: "/services" },
  { label: "Noticias", href: "/news" },
  { label: "Contacto", href: "/contact" },
];

export default function Navbar() {
  const { user, loading, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E2D9CF] shadow-sm">
      <div className="container-spa">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo_ariday.jpeg"
              alt="Ariday Spa Logo"
              width={52}
              height={52}
              className="object-contain"
            />
            <div className="leading-tight">
              <span className="font-playfair text-xl font-semibold text-[#1A1A1A] group-hover:text-[#C4956A] transition-colors">
                Ariday
              </span>
              <p className="text-[10px] text-[#6B6B6B] tracking-widest uppercase -mt-0.5">
                Luxury Spa
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#C4956A] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4956A] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+1234567890"
              className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#C4956A] transition-colors"
            >
              <Phone size={14} />
              <span>(123) 456-7890</span>
            </a>

            {!loading && (
              user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/account"
                    className="flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#C4956A] transition-colors"
                  >
                    <User size={14} className="text-[#C4956A]" />
                    {user.name.split(" ")[0]}
                  </Link>
                  <Link href="/booking">
                    <Button size="sm" className="bg-[#C4956A] hover:bg-[#A0784A] text-white font-medium px-5 rounded-none transition-colors">
                      Reservar
                    </Button>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1 text-xs text-[#9A9A9A] hover:text-[#C4956A] transition-colors"
                  >
                    <LogOut size={13} />
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-sm font-medium text-[#1A1A1A] hover:text-[#C4956A] transition-colors">
                    Iniciar Sesión
                  </Link>
                  <Link href="/booking">
                    <Button size="sm" className="bg-[#C4956A] hover:bg-[#A0784A] text-white font-medium px-5 rounded-none transition-colors">
                      Reservar
                    </Button>
                  </Link>
                </div>
              )
            )}
          </div>

          {/* Mobile menu */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-[#1A1A1A]">
                  <Menu size={22} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-[#F8F5F0] border-[#E2D9CF]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-6 border-b border-[#E2D9CF]">
                    <span className="font-playfair text-lg font-semibold text-[#1A1A1A]">
                      Ariday
                    </span>
                  </div>

                  <nav className="flex flex-col gap-1 mt-6">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="text-base font-medium text-[#1A1A1A] hover:text-[#C4956A] py-3 px-2 border-b border-[#E2D9CF]/50 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                    {!loading && !user && (
                      <SheetClose asChild>
                        <Link
                          href="/login"
                          className="text-base font-medium text-[#C4956A] py-3 px-2 border-b border-[#E2D9CF]/50"
                        >
                          Iniciar Sesión
                        </Link>
                      </SheetClose>
                    )}
                  </nav>

                  <div className="mt-auto pb-8">
                    {user && (
                      <>
                        <p className="text-xs text-[#9A9A9A] mb-3 text-center">
                          Sesión iniciada como <strong className="text-[#1A1A1A]">{user.name}</strong>
                        </p>
                        <SheetClose asChild>
                          <Link
                            href="/account"
                            className="flex items-center justify-center gap-2 mb-3 text-sm text-[#6B6B6B] hover:text-[#C4956A] transition-colors"
                          >
                            <User size={14} />
                            Mi Cuenta
                          </Link>
                        </SheetClose>
                      </>
                    )}
                    <SheetClose asChild>
                      <Link href="/booking" className="block">
                        <Button className="w-full bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none font-medium">
                          Agendar Cita
                        </Button>
                      </Link>
                    </SheetClose>
                    {user && (
                      <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 mt-4 text-sm text-[#9A9A9A] w-full hover:text-[#C4956A] transition-colors"
                      >
                        <LogOut size={14} />
                        Cerrar Sesión
                      </button>
                    )}
                    {!user && (
                      <a
                        href="tel:+1234567890"
                        className="flex items-center justify-center gap-2 mt-4 text-sm text-[#6B6B6B]"
                      >
                        <Phone size={14} />
                        (123) 456-7890
                      </a>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
