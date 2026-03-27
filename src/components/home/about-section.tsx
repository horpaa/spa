import Link from "next/link";
import { Play, Leaf, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const miniServices = [
  { icon: <Leaf size={28} className="text-[#C4956A]" />, label: "Manicure" },
  { icon: <Sparkles size={28} className="text-[#C4956A]" />, label: "Make-up" },
  { icon: <Heart size={28} className="text-[#C4956A]" />, label: "Body Massage" },
];

export default function AboutSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-spa">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-2">
              {/* Main tall image */}
              <div
                className="row-span-2 h-64 bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&auto=format&fit=crop)",
                }}
              />
              {/* Top right */}
              <div
                className="h-[124px] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&auto=format&fit=crop)",
                }}
              />
              {/* Bottom right */}
              <div
                className="h-[124px] bg-cover bg-center rounded-sm"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1607748851687-f4f6b64e0e2a?w=600&auto=format&fit=crop)",
                }}
              />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-5 -right-5 md:bottom-4 md:right-4 w-28 h-28 rounded-full bg-[#C4956A] flex flex-col items-center justify-center text-white shadow-lg">
              <span className="font-playfair text-2xl font-bold leading-none">15+</span>
              <span className="text-[10px] tracking-wider uppercase text-center leading-tight mt-1 px-2">
                Years Experience
              </span>
            </div>

            {/* Play button */}
            <button className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:scale-110 transition-transform group">
              <Play size={20} className="text-[#C4956A] ml-1 group-hover:text-[#A0784A]" />
            </button>
          </div>

          {/* Right: content */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[#C4956A]" />
              <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
                Nuestra Historia
              </p>
            </div>
            <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-[#1A1A1A] leading-tight mb-3">
              Construyendo Salud Física y Mental
            </h2>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">
              En Ariday creemos que la verdadera belleza irradia desde adentro. Durante más de 15 años,
              nuestros expertos terapeutas han brindado experiencias spa transformadoras usando ingredientes
              orgánicos premium y técnicas ancestrales.
            </p>

            {/* Mini services */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {miniServices.map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1.5 text-center">
                  <div className="w-11 h-11 rounded-full bg-[#F8F5F0] border border-[#E2D9CF] flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-xs font-medium text-[#1A1A1A]">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="/about">
                <Button className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-6 font-medium tracking-wide">
                  Conocer Más
                </Button>
              </Link>
              <a
                href="tel:+525512345678"
                className="text-sm text-[#6B6B6B] hover:text-[#C4956A] transition-colors"
              >
                Chatea · (55) 1234-5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
