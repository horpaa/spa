"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import StepService from "./step-service";
import StepDatetime from "./step-datetime";
import StepTherapist from "./step-therapist";
import StepPersonal from "./step-personal";
import StepConfirmation from "./step-confirmation";
import type { ApiService, ApiTherapist } from "@/lib/types";
import { useAuthStore } from "@/lib/stores/auth-store";

export interface BookingData {
  serviceSlug: string;
  date: Date | undefined;
  timeSlot: string;
  therapistId: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const steps = [
  { number: 1, label: "Servicio" },
  { number: 2, label: "Fecha y Hora" },
  { number: 3, label: "Terapeuta" },
  { number: 4, label: "Tus Datos" },
  { number: 5, label: "Confirmar" },
];

export default function BookingStepper() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") ?? "";

  const [currentStep, setCurrentStep] = useState(1);
  const [booking, setBooking] = useState<BookingData>({
    serviceSlug: initialService,
    date: undefined,
    timeSlot: "",
    therapistId: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const { user } = useAuthStore();
  const [services, setServices] = useState<ApiService[]>([]);
  const [therapists, setTherapists] = useState<ApiTherapist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/therapists").then((r) => r.json()),
    ]).then(([sRes, tRes]) => {
      if (sRes.success) setServices(sRes.data);
      if (tRes.success) setTherapists(tRes.data);
      setLoading(false);
    });
  }, []);

  // Pre-fill personal data from authenticated user
  useEffect(() => {
    if (user) {
      setBooking((prev) => ({
        ...prev,
        name: prev.name || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const update = (partial: Partial<BookingData>) =>
    setBooking((prev) => ({ ...prev, ...partial }));

  const next = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const selectedService = services.find((s) => s.slug === booking.serviceSlug);
  const selectedTherapist = therapists.find((t) => t.id === booking.therapistId);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-[#E2D9CF] p-10 flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#C4956A] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[#6B6B6B] text-sm">Cargando servicios...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step progress */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-5 left-0 right-0 h-px bg-[#E2D9CF] z-0" />
        <div
          className="absolute top-5 left-0 h-px bg-[#C4956A] z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step) => {
          const done = currentStep > step.number;
          const active = currentStep === step.number;
          return (
            <div
              key={step.number}
              className="flex flex-col items-center gap-2 z-10 cursor-pointer"
              onClick={() => done && setCurrentStep(step.number)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                  done
                    ? "bg-[#C4956A] border-[#C4956A] text-white"
                    : active
                    ? "bg-white border-[#C4956A] text-[#C4956A]"
                    : "bg-white border-[#E2D9CF] text-[#6B6B6B]"
                }`}
              >
                {done ? <Check size={16} /> : step.number}
              </div>
              <span
                className={`text-xs font-medium hidden sm:block ${
                  active ? "text-[#C4956A]" : done ? "text-[#1A1A1A]" : "text-[#9A9A9A]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="bg-white border border-[#E2D9CF] p-6 md:p-10">
        {currentStep === 1 && (
          <StepService booking={booking} update={update} onNext={next} services={services} />
        )}
        {currentStep === 2 && (
          <StepDatetime booking={booking} update={update} onNext={next} onPrev={prev} />
        )}
        {currentStep === 3 && (
          <StepTherapist booking={booking} update={update} onNext={next} onPrev={prev} therapists={therapists} />
        )}
        {currentStep === 4 && (
          <StepPersonal booking={booking} update={update} onNext={next} onPrev={prev} />
        )}
        {currentStep === 5 && (
          <StepConfirmation
            booking={booking}
            service={selectedService}
            therapist={selectedTherapist}
            onPrev={prev}
          />
        )}
      </div>
    </div>
  );
}
