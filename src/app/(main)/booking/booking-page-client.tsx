"use client";

import { Suspense } from "react";
import BookingStepper from "@/components/booking/booking-stepper";

export default function BookingPageClient() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#6B6B6B]">Loading...</div>}>
      <BookingStepper />
    </Suspense>
  );
}
