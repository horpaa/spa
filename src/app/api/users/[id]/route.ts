import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { userUpdateSchema } from "@/lib/validations";
import { getSession } from "@/lib/auth";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session) return err("Unauthorized", 401);
    if (session.sub !== id && session.role !== "ADMIN") return err("Forbidden", 403);

    const body = await req.json();
    const { password, ...rest } = userUpdateSchema.parse(body);

    const updateData: Record<string, unknown> = { ...rest };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await db.user.update({ where: { id }, data: updateData });
    return ok(user);
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const apptCount = await db.appointment.count({ where: { clientId: id } });
    if (apptCount > 0) {
      return err("Cannot delete user with existing appointments", 409);
    }
    await db.user.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return err("Internal server error", 500);
  }
}
