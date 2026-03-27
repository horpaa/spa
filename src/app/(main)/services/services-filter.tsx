"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { ApiService } from "@/lib/types";

type FilterCategory = "all" | string;

const categories: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "MASAJES", label: "Masajes" },
  { value: "FACIALES", label: "Faciales" },
  { value: "CORPORALES", label: "Cuerpo" },
  { value: "NAIL_SPA", label: "Uñas" },
  { value: "MAQUILLAJE", label: "Maquillaje" },
];

export default function ServicesFilter({ services }: { services: ApiService[] }) {
  const [active, setActive] = useState<FilterCategory>("all");

  const filtered = active === "all" ? services : services.filter((s) => s.category === active);

  return (
    <>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`px-5 py-2 text-sm font-medium transition-colors border ${
              active === cat.value
                ? "bg-[#C4956A] text-white border-[#C4956A]"
                : "bg-white text-[#6B6B6B] border-[#E2D9CF] hover:border-[#C4956A] hover:text-[#C4956A]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((service) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="group bg-white border border-[#E2D9CF] hover:border-[#C4956A] overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
            <div
              className="h-52 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-2xl mb-2 block">{service.icon}</span>
                  <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A]">
                    {service.name}
                  </h3>
                </div>
                {service.isPopular && (
                  <span className="text-[10px] bg-[#C4956A] text-white px-2 py-1 tracking-wider uppercase font-medium mt-1">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">
                {service.shortDescription}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[#E2D9CF]">
                <div className="flex items-center gap-1.5 text-[#6B6B6B] text-xs">
                  <Clock size={13} />
                  {service.duration} min
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#C4956A] font-semibold text-sm mr-3">
                    ${service.price}
                  </span>
                  <span className="text-[#C4956A] group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
