import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export const metadata = {
  title: "Nosotros — Ariday Spa",
  description: "Conoce Ariday Spa — nuestra historia, valores y equipo de expertos.",
};

export default async function AboutPage() {
  const therapists = await db.therapist.findMany({
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });

  return (
    <>
      {/* Hero */}
      <div
        className="relative pt-16 pb-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1600&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/65" />
        <div className="relative z-10 container-spa text-center">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Nuestra Historia
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
            Nosotros
          </h1>
          <p className="text-white/70 text-base max-w-lg mx-auto">
            Un santuario de belleza y bienestar, dedicado a restaurar tu armonía interior.
          </p>
        </div>
      </div>

      {/* Story section */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div
              className="h-96 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop)",
              }}
            />
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-px bg-[#C4956A]" />
                <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
                  Desde 2009
                </p>
              </div>
              <h2 className="font-playfair text-3xl font-semibold text-[#1A1A1A] mb-5">
                Un Lugar de Verdadera Serenidad
              </h2>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-4">
                Fundado en 2009 por la visionaria del bienestar María Ariday, nuestro spa nació
                de la creencia profunda de que todos merecen un espacio para pausar, respirar y
                reconectarse. Lo que comenzó como un pequeño estudio de bienestar se ha convertido
                en un destino spa de lujo completo.
              </p>
              <p className="text-[#6B6B6B] text-sm leading-relaxed mb-8">
                Fusionamos tradiciones ancestrales de sanación con técnicas modernas, usando solo
                ingredientes orgánicos premium de origen sostenible. Cada detalle —desde la
                iluminación suave hasta la música curada— está diseñado para profundizar tu
                sensación de paz y restaurar tu vitalidad natural.
              </p>
              <Link href="/booking">
                <Button className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-7 font-medium">
                  Reservar Tratamiento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-spa">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#C4956A]" />
              <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
                En lo que Creemos
              </p>
              <span className="w-8 h-px bg-[#C4956A]" />
            </div>
            <h2 className="font-playfair text-3xl font-semibold text-[#1A1A1A]">Nuestros Valores</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🌿",
                title: "Natural y Orgánico",
                desc: "Usamos solo los mejores productos naturales y libres de crueldad, amables con tu piel y el medio ambiente.",
              },
              {
                icon: "✨",
                title: "Cuidado Experto",
                desc: "Nuestros terapeutas son profesionales certificados con años de formación especializada y pasión genuina.",
              },
              {
                icon: "🤍",
                title: "Personalizado",
                desc: "Cada tratamiento está adaptado a tus necesidades únicas, asegurando la experiencia más beneficiosa posible.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center p-8 border border-[#E2D9CF]">
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-3">
                  {v.title}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#C4956A]" />
              <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
                Conoce a los Expertos
              </p>
              <span className="w-8 h-px bg-[#C4956A]" />
            </div>
            <h2 className="font-playfair text-3xl font-semibold text-[#1A1A1A]">Nuestro Equipo</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="group text-center">
                <div
                  className="w-full h-64 bg-cover bg-center mb-5 grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                  style={{ backgroundImage: `url(${therapist.avatar})` }}
                />
                <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-1">
                  {therapist.user.name}
                </h3>
                <p className="text-[#C4956A] text-xs uppercase tracking-wider mb-2">
                  Terapeuta
                </p>
                <div className="flex items-center justify-center gap-1 mb-3">
                  <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-xs text-[#6B6B6B]">{therapist.experience} años</span>
                </div>
                <p className="text-[#6B6B6B] text-xs leading-relaxed px-2">{therapist.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
