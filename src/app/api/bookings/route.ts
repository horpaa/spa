import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { bookingCreateSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  const appointments = await db.appointment.findMany({
    include: {
      client: true,
      therapist: { include: { user: true } },
      service: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return ok(
    appointments.map((a) => ({
      ...a,
      totalPrice: Number(a.totalPrice),
      payment: a.payment ? { ...a.payment, amount: Number(a.payment.amount) } : null,
    }))
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = bookingCreateSchema.parse(body);

    const service = await db.service.findUnique({ where: { slug: data.serviceSlug } });
    if (!service) return err("Service not found", 404);

    const user = await db.user.upsert({
      where: { email: data.email },
      update: { name: data.name, phone: data.phone },
      create: {
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: "CLIENTE",
        password: crypto.randomUUID(),
      },
    });

    const therapistId =
      !data.therapistId || data.therapistId === "any" ? null : data.therapistId;

    // Parse timeSlot (e.g. "10:00 AM") to 24h start/end
    const parseTime = (slot: string): string => {
      const match = slot.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
      if (!match) return slot;
      let hour = parseInt(match[1]);
      const min = match[2];
      const meridiem = match[3]?.toUpperCase();
      if (meridiem === "PM" && hour < 12) hour += 12;
      if (meridiem === "AM" && hour === 12) hour = 0;
      return `${String(hour).padStart(2, "0")}:${min}`;
    };

    const startTime = parseTime(data.timeSlot);
    const [h, m] = startTime.split(":").map(Number);
    const endMinutes = h * 60 + m + service.duration;
    const endTime = `${String(Math.floor(endMinutes / 60)).padStart(2, "0")}:${String(endMinutes % 60).padStart(2, "0")}`;

    const appointment = await db.appointment.create({
      data: {
        clientId: user.id,
        therapistId,
        serviceId: service.id,
        date: new Date(data.date),
        startTime,
        endTime,
        notes: data.notes,
        totalPrice: service.price,
        payment: {
          create: {
            amount: service.price,
            status: "PENDIENTE",
            method: "MANUAL",
          },
        },
      },
      include: { payment: true },
    });

    return ok(
      {
        ...appointment,
        totalPrice: Number(appointment.totalPrice),
        payment: appointment.payment
          ? { ...appointment.payment, amount: Number(appointment.payment.amount) }
          : null,
      },
      201
    );
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    console.error(e);
    return err("Internal server error", 500);
  }
}
