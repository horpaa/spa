import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const serviceLinks = [
  { label: "Stone Spa", href: "/services/stone-spa" },
  { label: "Tratamientos Faciales", href: "/services/face-treatments" },
  { label: "Masaje Corporal", href: "/services/body-massage" },
  { label: "Aromaterapia", href: "/services/aromatherapy" },
  { label: "Manicure & Pedicure", href: "/services/manicure-pedicure" },
];

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/about" },
  { label: "Servicios", href: "/services" },
  { label: "Noticias", href: "/news" },
  { label: "Contacto", href: "/contact" },
  { label: "Agendar Cita", href: "/booking" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Top section */}
      <div className="container-spa py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full border-2 border-[#C4956A] flex items-center justify-center">
                <span className="text-[#C4956A] text-sm font-playfair font-bold">A</span>
              </div>
              <div>
                <span className="font-playfair text-xl font-semibold text-white">Ariday</span>
                <p className="text-[10px] text-[#C4956A] tracking-widest uppercase -mt-0.5">
                  Luxury Spa
                </p>
              </div>
            </div>
            <p className="text-sm text-[#9A9A9A] leading-relaxed mb-6">
              Vive la esencia de la belleza y el bienestar. Ofrecemos tratamientos premium
              diseñados para restaurar tu mente, cuerpo y espíritu.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full border border-[#C4956A]/40 flex items-center justify-center text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors">
                <Instagram size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#C4956A]/40 flex items-center justify-center text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors">
                <Facebook size={15} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-[#C4956A]/40 flex items-center justify-center text-[#C4956A] hover:bg-[#C4956A] hover:text-white transition-colors">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-base font-semibold text-white mb-5 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-px after:bg-[#C4956A]">
              Enlaces
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#9A9A9A] hover:text-[#C4956A] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#C4956A]/40 group-hover:bg-[#C4956A] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-base font-semibold text-white mb-5 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-px after:bg-[#C4956A]">
              Nuestros Servicios
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#9A9A9A] hover:text-[#C4956A] transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#C4956A]/40 group-hover:bg-[#C4956A] transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-base font-semibold text-white mb-5 relative pb-3 after:absolute after:bottom-0 after:left-0 after:w-8 after:h-px after:bg-[#C4956A]">
              Contáctanos
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C4956A] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#9A9A9A] leading-relaxed">
                  Av. Bienestar 123, Ciudad de México, CDMX 06600
                </span>
              </li>
              <li>
                <a href="tel:+1234567890" className="flex items-center gap-3 text-sm text-[#9A9A9A] hover:text-[#C4956A] transition-colors">
                  <Phone size={16} className="text-[#C4956A] flex-shrink-0" />
                  (55) 1234-5678
                </a>
              </li>
              <li>
                <a href="mailto:hola@ariday.com" className="flex items-center gap-3 text-sm text-[#9A9A9A] hover:text-[#C4956A] transition-colors">
                  <Mail size={16} className="text-[#C4956A] flex-shrink-0" />
                  hola@ariday.com
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-5 border-t border-white/10">
              <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-2">Horario</p>
              <p className="text-sm text-[#9A9A9A]">Lun – Vie: 9:00 am – 8:00 pm</p>
              <p className="text-sm text-[#9A9A9A]">Sáb – Dom: 10:00 am – 6:00 pm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-spa py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} Ariday Luxury Spa. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" className="text-xs text-[#6B6B6B] hover:text-[#C4956A] transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-xs text-[#6B6B6B] hover:text-[#C4956A] transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
