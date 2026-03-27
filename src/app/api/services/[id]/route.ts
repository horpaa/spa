import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { serviceUpdateSchema } from "@/lib/validations";
import { ZodError } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = serviceUpdateSchema.parse(body);
    const service = await db.service.update({
      where: { id },
      data,
    });
    return ok({ ...service, price: Number(service.price) });
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await db.service.update({ where: { id }, data: { isActive: false } });
    return ok({ deleted: true });
  } catch {
    return err("Internal server error", 500);
  }
}
