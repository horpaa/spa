"use client";

import { Button } from "@/components/ui/button";
import type { BookingData } from "./booking-stepper";

interface Props {
  booking: BookingData;
  update: (p: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepPersonal({ booking, update, onNext, onPrev }: Props) {
  const isValid = booking.name.trim() && booking.email.trim() && booking.phone.trim();

  return (
    <div>
      <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
        Tus Datos
      </h2>
      <p className="text-[#6B6B6B] text-sm mb-8">
        Ingresa tus datos de contacto para completar la reserva.
      </p>

      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
            Nombre Completo <span className="text-[#C4956A]">*</span>
          </label>
          <input
            type="text"
            value={booking.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Tu nombre completo"
            className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] transition-colors bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
            Correo Electrónico <span className="text-[#C4956A]">*</span>
          </label>
          <input
            type="email"
            value={booking.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="tu@correo.com"
            className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] transition-colors bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
            Teléfono <span className="text-[#C4956A]">*</span>
          </label>
          <input
            type="tel"
            value={booking.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="(55) 1234-5678"
            className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] transition-colors bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
            Solicitudes Especiales{" "}
            <span className="text-[#9A9A9A] normal-case tracking-normal font-normal">
              (opcional)
            </span>
          </label>
          <textarea
            value={booking.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Alergias, preferencias o notas para tu terapeuta..."
            rows={4}
            className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9A9A9A] transition-colors bg-white resize-none"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-[#C4956A] text-[#C4956A] rounded-none px-6 hover:bg-[#C4956A] hover:text-white"
        >
          Volver
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-8 font-medium disabled:opacity-40"
        >
          Revisar Reserva
        </Button>
      </div>
    </div>
  );
}
