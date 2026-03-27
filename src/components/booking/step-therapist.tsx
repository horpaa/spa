import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiTherapist } from "@/lib/types";
import type { BookingData } from "./booking-stepper";

interface Props {
  booking: BookingData;
  update: (p: Partial<BookingData>) => void;
  onNext: () => void;
  onPrev: () => void;
  therapists: ApiTherapist[];
}

export default function StepTherapist({ booking, update, onNext, onPrev, therapists }: Props) {
  return (
    <div>
      <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
        Elige tu Terapeuta
      </h2>
      <p className="text-[#6B6B6B] text-sm mb-8">
        Selecciona tu terapeuta preferido o deja que asignemos el mejor disponible.
      </p>

      {/* "No preference" option */}
      <button
        onClick={() => update({ therapistId: "any" })}
        className={`w-full text-left p-4 border-2 mb-4 flex items-center gap-4 transition-all ${
          booking.therapistId === "any"
            ? "border-[#C4956A] bg-[#C4956A]/5"
            : "border-[#E2D9CF] hover:border-[#C4956A]/50"
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-[#F8F5F0] border border-[#E2D9CF] flex items-center justify-center text-xl flex-shrink-0">
          ✨
        </div>
        <div>
          <p className="font-semibold text-[#1A1A1A] text-sm">Sin Preferencia</p>
          <p className="text-[#6B6B6B] text-xs mt-0.5">
            Asignaremos al mejor terapeuta disponible para tu sesión.
          </p>
        </div>
        {booking.therapistId === "any" && (
          <span className="ml-auto w-5 h-5 rounded-full bg-[#C4956A] flex items-center justify-center flex-shrink-0">
            <Check size={12} className="text-white" />
          </span>
        )}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {therapists.map((therapist) => {
          const selected = booking.therapistId === therapist.id;
          return (
            <button
              key={therapist.id}
              onClick={() => update({ therapistId: therapist.id })}
              className={`text-left p-5 border-2 transition-all duration-200 relative flex gap-4 ${
                selected
                  ? "border-[#C4956A] bg-[#C4956A]/5"
                  : "border-[#E2D9CF] hover:border-[#C4956A]/50 bg-white"
              }`}
            >
              <div
                className="w-14 h-14 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url(${therapist.avatar})` }}
              />
              <div className="min-w-0">
                <p className="font-semibold text-[#1A1A1A] text-sm">{therapist.name}</p>
                <p className="text-[#C4956A] text-xs mb-1">Terapeuta</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={11} className="fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-xs text-[#6B6B6B]">{therapist.experience} años exp.</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {therapist.specialty.slice(0, 2).map((s) => (
                    <span
                      key={s}
                      className="text-[10px] bg-[#F8F5F0] border border-[#E2D9CF] px-1.5 py-0.5 text-[#6B6B6B]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              {selected && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#C4956A] flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </span>
              )}
            </button>
          );
        })}
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
          disabled={!booking.therapistId}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-8 font-medium disabled:opacity-40"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
