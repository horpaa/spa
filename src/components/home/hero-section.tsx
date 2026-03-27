"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    heading: "La Esencia\nde la Belleza",
    subheading: "Estilismo Profesional desde 1995",
    description:
      "Descubre la relajación y el rejuvenecimiento con nuestros tratamientos premium. Tu camino hacia el bienestar comienza aquí.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1600&auto=format&fit=crop&q=80",
    cta: "Reservar Ahora",
  },
  {
    heading: "Sana tu\nMente y Cuerpo",
    subheading: "Experiencias de Bienestar Premium",
    description:
      "Desde masajes de tejido profundo hasta lujosos faciales, ofrecemos tratamientos personalizados para restaurar tu equilibrio interior.",
    image:
      "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&auto=format&fit=crop&q=80",
    cta: "Nuestros Servicios",
  },
  {
    heading: "Tu Resplandor\nRestaurado",
    subheading: "Especialistas en Cuidado de Piel",
    description:
      "Deja que nuestros expertos realcen tu brillo natural con rituales de piel personalizados y tratamientos exclusivos.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&auto=format&fit=crop&q=80",
    cta: "Ver Faciales",
  },
  {
    heading: "Nuestros\nProductos",
    subheading: "Línea de productos Ariday Spa",
    description:
      "Cremas, exfoliantes y shampoos elaborados con ingredientes naturales para el cuidado de tu piel y cabello.",
    image: "/productos_ariday1.jpeg",
    cta: "Conocer Más",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const slide = slides[current];

  return (
    <section className="relative h-[75vh] min-h-[520px] max-h-[720px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Decorative mandala */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none hidden lg:block">
        <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="165" stroke="white" strokeWidth="1" />
          <circle cx="170" cy="170" r="130" stroke="white" strokeWidth="0.5" />
          <circle cx="170" cy="170" r="95" stroke="white" strokeWidth="1" />
          <circle cx="170" cy="170" r="60" stroke="white" strokeWidth="0.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1={170 + 60 * Math.cos((angle * Math.PI) / 180)}
              y1={170 + 60 * Math.sin((angle * Math.PI) / 180)}
              x2={170 + 165 * Math.cos((angle * Math.PI) / 180)}
              y2={170 + 165 * Math.sin((angle * Math.PI) / 180)}
              stroke="white"
              strokeWidth="0.5"
            />
          ))}
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container-spa h-full flex flex-col justify-center">
        <div className="max-w-xl">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            {slide.subheading}
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 whitespace-pre-line">
            {slide.heading}
          </h1>
          <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6 max-w-sm">
            {slide.description}
          </p>
          <Link href="/booking">
            <Button className="bg-[#C4956A] hover:bg-[#A0784A] text-white px-8 py-3 h-auto text-sm font-medium rounded-none tracking-wider uppercase transition-colors">
              {slide.cta}
            </Button>
          </Link>
        </div>
      </div>

      {/* Slider arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Siguiente"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current ? "w-6 h-2 bg-[#C4956A]" : "w-2 h-2 bg-white/50"
            }`}
            aria-label={`Diapositiva ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
