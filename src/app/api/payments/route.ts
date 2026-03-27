import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { paymentCreateSchema } from "@/lib/validations";
import { PaymentStatus } from "@/generated/prisma";
import { ZodError } from "zod";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") as PaymentStatus | null;

  const payments = await db.payment.findMany({
    where: status ? { status } : undefined,
    include: {
      appointment: {
        include: {
          client: true,
          service: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return ok(
    payments.map((p) => ({
      id: p.id,
      amount: Number(p.amount),
      status: p.status,
      method: p.method,
      paidAt: p.paidAt?.toISOString() ?? null,
      createdAt: p.createdAt.toISOString(),
      client: p.appointment.client.name,
      clientEmail: p.appointment.client.email,
      service: p.appointment.service.name,
      appointmentDate: p.appointment.date,
      appointmentId: p.appointmentId,
    }))
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = paymentCreateSchema.parse(body);

    const existing = await db.payment.findUnique({ where: { appointmentId: data.appointmentId } });
    if (existing) return err("Esta cita ya tiene un pago registrado.", 409);

    const appointment = await db.appointment.findUnique({ where: { id: data.appointmentId } });
    if (!appointment) return err("Cita no encontrada.", 404);

    const payment = await db.payment.create({
      data: {
        appointmentId: data.appointmentId,
        amount: data.amount,
        method: data.method,
        status: data.status,
        paidAt: data.status === "PAGADO" ? new Date() : null,
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
    }, 201);
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
