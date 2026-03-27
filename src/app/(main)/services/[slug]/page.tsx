import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, DollarSign, Check, ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export async function generateStaticParams() {
  const services = await db.service.findMany({ where: { isActive: true }, select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;

  const service = await db.service.findUnique({ where: { slug } });
  if (!service) notFound();

  const price = Number(service.price);

  const related = await db.service.findMany({
    where: { isActive: true, category: service.category, slug: { not: service.slug } },
    take: 3,
  });

  return (
    <>
      {/* Hero */}
      <div
        className="relative pt-16 pb-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${service.image})` }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/65" />
        <div className="relative z-10 container-spa">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver a Servicios
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{service.icon}</span>
            <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium">
              {service.category}
            </p>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4 max-w-xl">
            {service.name}
          </h1>
          <div className="flex items-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {service.duration} minutos
            </span>
            <span className="flex items-center gap-1.5">
              <DollarSign size={14} />
              Desde ${price}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-5">
                Acerca de este Tratamiento
              </h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-10">{service.description}</p>

              <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-5">
                Beneficios Clave
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[#6B6B6B] text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#C4956A]/15 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-[#C4956A]" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* Related */}
              {related.length > 0 && (
                <div className="mt-14">
                  <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-6">
                    Tratamientos Relacionados
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.id}
                        href={`/services/${r.slug}`}
                        className="group bg-white border border-[#E2D9CF] hover:border-[#C4956A] overflow-hidden transition-all"
                      >
                        <div
                          className="h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url(${r.image})` }}
                        />
                        <div className="p-4">
                          <p className="font-medium text-sm text-[#1A1A1A] group-hover:text-[#C4956A] transition-colors">
                            {r.name}
                          </p>
                          <p className="text-xs text-[#C4956A] mt-1">${Number(r.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking sidebar */}
            <div>
              <div className="bg-white border border-[#E2D9CF] p-7 sticky top-24">
                <h3 className="font-playfair text-xl font-semibold text-[#1A1A1A] mb-2">
                  Reservar este Tratamiento
                </h3>
                <p className="text-[#6B6B6B] text-sm mb-6">
                  Reserva tu sesión ahora y disfruta de una experiencia de agendamiento sin complicaciones.
                </p>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between py-3 border-b border-[#E2D9CF]">
                    <span className="text-[#6B6B6B]">Duración</span>
                    <span className="font-medium text-[#1A1A1A]">{service.duration} min</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E2D9CF]">
                    <span className="text-[#6B6B6B]">Desde</span>
                    <span className="font-semibold text-[#C4956A] text-base">${price}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[#E2D9CF]">
                    <span className="text-[#6B6B6B]">Categoría</span>
                    <span className="font-medium text-[#1A1A1A] capitalize">{service.category}</span>
                  </div>
                </div>

                <Link href={`/booking?service=${service.slug}`} className="block">
                  <Button className="w-full bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none font-medium flex items-center gap-2 justify-center">
                    <Calendar size={16} />
                    Reservar Ahora
                  </Button>
                </Link>

                <p className="text-center text-xs text-[#6B6B6B] mt-4">
                  Cancelación gratuita hasta 24h antes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
