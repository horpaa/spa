import { db } from "@/lib/db";
import ServicesFilter from "./services-filter";
import type { ApiService } from "@/lib/types";

export default async function ServicesPage() {
  const raw = await db.service.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
  const services: ApiService[] = raw.map((s) => ({ ...s, price: Number(s.price) }));

  return (
    <>
      {/* Hero */}
      <div
        className="relative pt-16 pb-14 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1600&auto=format&fit=crop)",
        }}
      >
        <div className="absolute inset-0 bg-[#1A1A1A]/65" />
        <div className="relative z-10 container-spa text-center">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Lo que Ofrecemos
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-white/70 text-base max-w-md mx-auto">
            Descubre nuestra gama completa de tratamientos spa de lujo adaptados a tus necesidades.
          </p>
        </div>
      </div>

      {/* Filter + Grid */}
      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <ServicesFilter services={services} />
        </div>
      </section>
    </>
  );
}
