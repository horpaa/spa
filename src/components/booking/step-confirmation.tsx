"use client";

import { useState } from "react";
import { CheckCircle, Calendar, Clock, User, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BookingData } from "./booking-stepper";
import type { ApiService, ApiTherapist } from "@/lib/types";

interface Props {
  booking: BookingData;
  service: ApiService | undefined;
  therapist: ApiTherapist | undefined;
  onPrev: () => void;
}

export default function StepConfirmation({ booking, service, therapist, onPrev }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const dateStr = booking.date
        ? `${booking.date.getFullYear()}-${String(booking.date.getMonth() + 1).padStart(2, "0")}-${String(booking.date.getDate()).padStart(2, "0")}`
        : "";

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlug: booking.serviceSlug,
          date: dateStr,
          timeSlot: booking.timeSlot,
          therapistId: booking.therapistId,
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          notes: booking.notes,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al confirmar la reserva. Intenta de nuevo.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 rounded-full bg-[#C4956A]/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#C4956A]" />
        </div>
        <h2 className="font-playfair text-3xl font-semibold text-[#1A1A1A] mb-3">
          ¡Reserva Confirmada!
        </h2>
        <p className="text-[#6B6B6B] text-sm max-w-sm mx-auto mb-2">
          Gracias, <strong className="text-[#1A1A1A]">{booking.name}</strong>. Tu cita ha sido
          recibida con éxito.
        </p>
        <p className="text-[#6B6B6B] text-sm max-w-sm mx-auto mb-8">
          Recibirás un correo de confirmación en{" "}
          <strong className="text-[#C4956A]">{booking.email}</strong>
        </p>
        <div className="bg-[#F8F5F0] border border-[#E2D9CF] p-6 max-w-sm mx-auto text-left mb-8">
          <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
            Resumen de tu Cita
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Servicio</span>
              <span className="text-[#1A1A1A] font-medium">{service?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Fecha</span>
              <span className="text-[#1A1A1A] font-medium">
                {booking.date?.toLocaleDateString("es-MX", {
                  weekday: "short",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B6B6B]">Hora</span>
              <span className="text-[#1A1A1A] font-medium">{booking.timeSlot}</span>
            </div>
            <div className="flex justify-between border-t border-[#E2D9CF] pt-2 mt-2">
              <span className="text-[#6B6B6B] font-medium">Total</span>
              <span className="text-[#C4956A] font-semibold">${service?.price}</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => (window.location.href = "/")}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-8 font-medium"
        >
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
        Revisar y Confirmar
      </h2>
      <p className="text-[#6B6B6B] text-sm mb-8">
        Revisa los detalles de tu reserva antes de confirmar.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Service */}
        <div className="bg-[#F8F5F0] border border-[#E2D9CF] p-6">
          <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
            Tratamiento
          </p>
          {service && (
            <div className="flex gap-4">
              <div
                className="w-16 h-16 bg-cover bg-center rounded-sm flex-shrink-0"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div>
                <p className="font-semibold text-[#1A1A1A] text-sm mb-1">{service.name}</p>
                <p className="text-[#6B6B6B] text-xs flex items-center gap-1 mb-1">
                  <Clock size={11} />
                  {service.duration} minutos
                </p>
                <p className="text-[#C4956A] font-semibold text-sm">${service.price}</p>
              </div>
            </div>
          )}
        </div>

        {/* Schedule */}
        <div className="bg-[#F8F5F0] border border-[#E2D9CF] p-6">
          <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
            Horario
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <Calendar size={14} className="text-[#C4956A]" />
              {booking.date?.toLocaleDateString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <Clock size={14} className="text-[#C4956A]" />
              {booking.timeSlot}
            </div>
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <User size={14} className="text-[#C4956A]" />
              {therapist ? therapist.name : "Mejor Terapeuta Disponible"}
            </div>
          </div>
        </div>

        {/* Client info */}
        <div className="bg-[#F8F5F0] border border-[#E2D9CF] p-6 md:col-span-2">
          <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
            Tus Datos
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <User size={14} className="text-[#C4956A]" />
              {booking.name}
            </div>
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <Mail size={14} className="text-[#C4956A]" />
              {booking.email}
            </div>
            <div className="flex items-center gap-2 text-[#6B6B6B]">
              <Phone size={14} className="text-[#C4956A]" />
              {booking.phone}
            </div>
          </div>
          {booking.notes && (
            <p className="mt-3 text-xs text-[#6B6B6B] italic border-t border-[#E2D9CF] pt-3">
              Nota: {booking.notes}
            </p>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="border-t border-[#E2D9CF] pt-5 mb-8 flex justify-between items-center">
        <span className="text-[#1A1A1A] font-medium">Total</span>
        <span className="font-playfair text-2xl font-semibold text-[#C4956A]">
          ${service?.price}
        </span>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <p className="text-xs text-[#9A9A9A] mb-6">
        Al confirmar aceptas nuestra política de cancelación. Cancelación gratuita hasta 24 horas
        antes de tu cita.
      </p>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          disabled={loading}
          variant="outline"
          className="border-[#C4956A] text-[#C4956A] rounded-none px-6 hover:bg-[#C4956A] hover:text-white"
        >
          Volver
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={loading}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-8 font-medium disabled:opacity-60 flex items-center gap-2"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Confirmando..." : "Confirmar Reserva"}
        </Button>
      </div>
    </div>
  );
}
