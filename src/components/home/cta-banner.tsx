import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export default function CtaBanner() {
  return (
    <section
      className="relative py-24 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&auto=format&fit=crop&q=80)",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1A1A1A]/70" />

      <div className="relative z-10 container-spa text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-[#C4956A]" />
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
            ¿Lista para Relajarte?
          </p>
          <span className="w-8 h-px bg-[#C4956A]" />
        </div>

        <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
          Reserva tu Sesión Hoy
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-lg mx-auto mb-10">
          Da el primer paso hacia la relajación total. Agenda tu cita en pocos clics y déjanos
          encargarnos del resto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/booking">
            <Button className="bg-[#C4956A] hover:bg-[#A0784A] text-white px-8 py-3 h-auto rounded-none font-medium tracking-wide flex items-center gap-2">
              <Calendar size={16} />
              Agendar Cita
            </Button>
          </Link>
          <Link href="/services">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#1A1A1A] px-8 py-3 h-auto rounded-none font-medium tracking-wide bg-transparent"
            >
              Ver Servicios
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
