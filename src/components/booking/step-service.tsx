import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ApiService } from "@/lib/types";
import type { BookingData } from "./booking-stepper";

interface Props {
  booking: BookingData;
  update: (p: Partial<BookingData>) => void;
  onNext: () => void;
  services: ApiService[];
}

export default function StepService({ booking, update, onNext, services }: Props) {
  return (
    <div>
      <h2 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
        Elige tu Servicio
      </h2>
      <p className="text-[#6B6B6B] text-sm mb-8">
        Selecciona el tratamiento que deseas reservar.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {services.map((service) => {
          const selected = booking.serviceSlug === service.slug;
          return (
            <button
              key={service.id}
              onClick={() => update({ serviceSlug: service.slug })}
              className={`text-left p-5 border-2 transition-all duration-200 relative ${
                selected
                  ? "border-[#C4956A] bg-[#C4956A]/5"
                  : "border-[#E2D9CF] hover:border-[#C4956A]/50 bg-white"
              }`}
            >
              {selected && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#C4956A] flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </span>
              )}
              <span className="text-2xl block mb-2">{service.icon}</span>
              <p className="font-semibold text-[#1A1A1A] text-sm mb-1">{service.name}</p>
              <p className="text-[#6B6B6B] text-xs leading-relaxed mb-3">
                {service.shortDescription}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-[#6B6B6B]">
                  <Clock size={11} />
                  {service.duration} min
                </span>
                <span className="text-[#C4956A] font-semibold">${service.price}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!booking.serviceSlug}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none px-8 font-medium disabled:opacity-40"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
