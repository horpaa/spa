import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { bookingStatusSchema } from "@/lib/validations";
import { ZodError } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = bookingStatusSchema.parse(body);
    const appointment = await db.appointment.update({
      where: { id },
      data: { status: data.status },
    });
    return ok({ ...appointment, totalPrice: Number(appointment.totalPrice) });
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
