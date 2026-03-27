import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { userCreateSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  const users = await db.user.findMany({
    include: {
      _count: { select: { appointments: true } },
      appointments: { select: { totalPrice: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return ok(
    users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      createdAt: u.createdAt,
      appointmentCount: u._count.appointments,
      totalSpent: u.appointments.reduce((sum, a) => sum + Number(a.totalPrice), 0),
    }))
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = userCreateSchema.parse(body);
    const user = await db.user.create({
      data: {
        ...data,
        password: crypto.randomUUID(),
      },
    });
    return ok(user, 201);
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
