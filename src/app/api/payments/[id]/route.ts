import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { paymentUpdateSchema } from "@/lib/validations";
import { ZodError } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = paymentUpdateSchema.parse(body);

    const payment = await db.payment.update({
      where: { id },
      data: {
        status: data.status,
        ...(data.method ? { method: data.method } : {}),
        paidAt: data.status === "PAGADO" ? new Date() : data.status === "REEMBOLSADO" ? null : undefined,
      },
      include: { appointment: { include: { client: true, service: true } } },
    });

    return ok({
      id: payment.id,
      amount: Number(payment.amount),
      status: payment.status,
      method: payment.method,
      paidAt: payment.paidAt?.toISOString() ?? null,
      createdAt: payment.createdAt.toISOString(),
      client: payment.appointment.client.name,
      service: payment.appointment.service.name,
      appointmentId: payment.appointmentId,
    });
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
