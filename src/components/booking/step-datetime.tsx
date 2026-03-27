"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import type { BookingData } from "./booking-stepper";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM",
];

const unavailable = ["11:00 AM", "2:00 PM", "5:00 PM"];

interface Props {
  booking: BookingData;
  update: (p: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepDatetime({ booking, update, onNext, onPrev }: Props) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div>
      <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
        Elige Fecha y Hora
      </h2>
      <p className="text-[#6B6B6B] text-sm mb-8">
        Selecciona la fecha y el horario de tu cita.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        {/* Calendar */}
        <div>
          <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
            Seleccionar Fecha
          </p>
          <Calendar
            mode="single"
            selected={booking.date}
            onSelect={(date) => update({ date, timeSlot: "" })}
            disabled={(date) => date < tomorrow || date.getDay() === 0}
            className="border border-[#E2D9CF] p-3 w-full"
          />
        </div>

        {/* Time slots */}
        <div>
          <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
            Seleccionar Horario
          </p>
          {booking.date ? (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => {
                const busy = unavailable.includes(slot);
                const selected = booking.timeSlot === slot;
                return (
                  <button
                    key={slot}
                    disabled={busy}
                    onClick={() => update({ timeSlot: slot })}
                    className={`py-2.5 text-xs font-medium border transition-all ${
                      busy
                        ? "border-[#E2D9CF] text-[#C4C4C4] cursor-not-allowed line-through"
                        : selected
                        ? "border-[#C4956A] bg-[#C4956A] text-white"
                        : "border-[#E2D9CF] text-[#6B6B6B] hover:border-[#C4956A] hover:text-[#C4956A]"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 border border-dashed border-[#E2D9CF] text-[#9A9A9A] text-sm">
              Primero selecciona una fecha
            </div>
          )}
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
          disabled={!booking.date || !booking.timeSlot}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-8 font-medium disabled:opacity-40"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
