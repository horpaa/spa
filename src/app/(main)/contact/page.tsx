import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./contact-form";

export const metadata = {
  title: "Contacto — Ariday Spa",
  description: "Contáctanos en Ariday Spa. Estamos aquí para ayudarte a reservar o responder cualquier pregunta.",
};

const contactInfo = [
  {
    icon: <MapPin size={20} className="text-[#C4956A]" />,
    label: "Ubicación",
    value: "Av. Bienestar 123, Ciudad de México, CDMX 06600",
  },
  {
    icon: <Phone size={20} className="text-[#C4956A]" />,
    label: "Teléfono",
    value: "(55) 1234-5678",
    href: "tel:+525512345678",
  },
  {
    icon: <Mail size={20} className="text-[#C4956A]" />,
    label: "Correo",
    value: "hola@ariday.com",
    href: "mailto:hola@ariday.com",
  },
  {
    icon: <Clock size={20} className="text-[#C4956A]" />,
    label: "Horario",
    value: "Lun–Vie 9am–8pm · Sáb–Dom 10am–6pm",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1A1A1A] pt-14 pb-12">
        <div className="container-spa text-center">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Escríbenos
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-3">
            Contacto
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            ¿Tienes alguna pregunta o quieres hacer una reserva? Con gusto te atendemos.
          </p>
        </div>
      </div>

      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Contact info */}
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-6">
                Visita Nuestro Spa
              </h2>
              <div className="space-y-6 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E2D9CF] flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#9A9A9A] uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-[#1A1A1A] hover:text-[#C4956A] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-[#1A1A1A]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="h-56 bg-[#EDE8E1] border border-[#E2D9CF] flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={32} className="text-[#C4956A] mx-auto mb-2" />
                  <p className="text-xs text-[#9A9A9A]">Integración de mapa próximamente</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-[#E2D9CF] p-8">
              <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
                Envíanos un Mensaje
              </h2>
              <p className="text-[#6B6B6B] text-sm mb-7">
                Completa el formulario y te responderemos en menos de 24 horas.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
