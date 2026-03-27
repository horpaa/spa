import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { serviceCreateSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  const services = await db.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
  return ok(services.map((s) => ({ ...s, price: Number(s.price) })));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = serviceCreateSchema.parse(body);
    const service = await db.service.create({
      data: {
        ...data,
        price: data.price,
      },
    });
    return ok({ ...service, price: Number(service.price) }, 201);
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
