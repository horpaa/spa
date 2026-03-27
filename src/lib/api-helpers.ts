import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function ok<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function err(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function handleZodError(e: ZodError) {
  return NextResponse.json(
    { success: false, error: "Validation error", details: e.issues },
    { status: 400 }
  );
}
