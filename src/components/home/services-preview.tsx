import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/db";

function SectionHeader({
  eyebrow,
  title,
  center = false,
}: {
  eyebrow: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-8 ${center ? "text-center" : ""}`}>
      <div className={`flex items-center gap-3 mb-3 ${center ? "justify-center" : ""}`}>
        <span className="w-8 h-px bg-[#C4956A]" />
        <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">{eyebrow}</p>
        <span className="w-8 h-px bg-[#C4956A]" />
      </div>
      <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-[#1A1A1A]">{title}</h2>
    </div>
  );
}

export default async function ServicesPreview() {
  const raw = await db.service.findMany({ where: { isActive: true }, take: 3, orderBy: { createdAt: "asc" } });
  const previewServices = raw.map((s) => ({ ...s, price: Number(s.price) }));

  return (
    <section className="section-padding bg-[#F8F5F0]">
      <div className="container-spa">
        <SectionHeader eyebrow="Lo que hacemos" title="Nuestros Servicios" center />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewServices.map((service, index) => {
            const isCenter = index === 1;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  isCenter
                    ? "bg-[#C4956A] text-white"
                    : "bg-white border border-[#E2D9CF] hover:border-[#C4956A]"
                }`}
              >
                <div className="p-5 pb-0">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 text-xl ${
                      isCenter
                        ? "bg-white/20"
                        : "bg-[#F8F5F0] border border-[#E2D9CF] group-hover:border-[#C4956A]"
                    }`}
                  >
                    {service.icon}
                  </div>

                  <h3
                    className={`font-playfair text-lg font-semibold mb-1.5 ${
                      isCenter ? "text-white" : "text-[#1A1A1A]"
                    }`}
                  >
                    {service.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-4 ${
                      isCenter ? "text-white/80" : "text-[#6B6B6B]"
                    }`}
                  >
                    {service.shortDescription}
                  </p>

                  {isCenter && (
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                      <ArrowRight size={15} className="text-white" />
                    </div>
                  )}
                </div>

                <div
                  className={`h-36 bg-cover bg-center mt-1 ${
                    !isCenter ? "grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" : ""
                  }`}
                  style={{ backgroundImage: `url(${service.image})` }}
                />

                {!isCenter && (
                  <div className="p-4 flex items-center justify-between border-t border-[#E2D9CF]">
                    <span className="text-[#C4956A] font-semibold text-sm">
                      Desde ${service.price}
                    </span>
                    <span className="text-[#6B6B6B] text-xs">{service.duration} min</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[#C4956A] font-medium text-sm hover:gap-3 transition-all border-b border-[#C4956A] pb-0.5"
          >
            Ver Todos los Servicios
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
