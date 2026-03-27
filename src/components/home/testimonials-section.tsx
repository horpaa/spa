"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="section-padding bg-[#F8F5F0]">
      <div className="container-spa">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#C4956A]" />
            <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
              Historias de Clientes
            </p>
            <span className="w-8 h-px bg-[#C4956A]" />
          </div>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-[#1A1A1A]">
            Lo que Dicen Nuestros Clientes
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[#E2D9CF] p-10 md:p-14 text-center relative">
            {/* Quote mark */}
            <div className="absolute top-6 left-8 font-playfair text-7xl text-[#C4956A]/20 leading-none select-none">
              "
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>

            {/* Text */}
            <p className="text-[#1A1A1A] text-base md:text-lg leading-relaxed italic mb-8 relative z-10">
              "{t.text}"
            </p>

            {/* Service tag */}
            <p className="text-[#C4956A] text-xs tracking-widest uppercase font-medium mb-5">
              {t.service}
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <div
                className="w-14 h-14 rounded-full bg-cover bg-center border-2 border-[#C4956A]"
                style={{ backgroundImage: `url(${t.avatar})` }}
              />
              <div className="text-left">
                <p className="font-semibold text-[#1A1A1A]">{t.name}</p>
                <p className="text-sm text-[#6B6B6B]">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[#C4956A] flex items-center justify-center text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "w-5 h-2.5 bg-[#C4956A]" : "w-2.5 h-2.5 bg-[#C4956A]/30"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[#C4956A] flex items-center justify-center text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
