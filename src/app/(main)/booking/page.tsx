import BookingPageClient from "./booking-page-client";

export const metadata = {
  title: "Agendar Cita — Ariday Spa",
  description: "Reserva tu tratamiento spa en pocos pasos simples.",
};

export default function BookingPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1A1A1A] pt-14 pb-12">
        <div className="container-spa text-center">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Tu Camino al Bienestar
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-3">
            Agenda tu Cita
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Sigue los pasos para reservar tu experiencia spa perfecta.
          </p>
        </div>
      </div>

      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <BookingPageClient />
        </div>
      </section>
    </>
  );
}
