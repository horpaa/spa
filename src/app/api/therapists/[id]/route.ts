import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { therapistUpdateSchema } from "@/lib/validations";
import { ZodError } from "zod";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const data = therapistUpdateSchema.parse(body);
    const { name, email, ...therapistData } = data;
    const therapist = await db.therapist.update({
      where: { id },
      data: {
        ...therapistData,
        ...(name || email
          ? { user: { update: { ...(name && { name }), ...(email && { email }) } } }
          : {}),
      },
      include: { user: true },
    });
    return ok({
      id: therapist.id,
      userId: therapist.userId,
      name: therapist.user.name,
      email: therapist.user.email,
      bio: therapist.bio,
      specialty: therapist.specialty,
      avatar: therapist.avatar,
      experience: therapist.experience,
    });
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    await db.therapist.delete({ where: { id } });
    return ok({ deleted: true });
  } catch {
    return err("Internal server error", 500);
  }
}
