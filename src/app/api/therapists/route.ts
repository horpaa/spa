import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { therapistCreateSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function GET() {
  const therapists = await db.therapist.findMany({
    include: { user: true },
    orderBy: { user: { name: "asc" } },
  });
  return ok(
    therapists.map((t) => ({
      id: t.id,
      userId: t.userId,
      name: t.user.name,
      email: t.user.email,
      bio: t.bio,
      specialty: t.specialty,
      avatar: t.avatar,
      experience: t.experience,
    }))
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = therapistCreateSchema.parse(body);
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: crypto.randomUUID(),
        role: "TERAPEUTA",
      },
    });
    const therapist = await db.therapist.create({
      data: {
        userId: user.id,
        bio: data.bio,
        specialty: data.specialty,
        avatar: data.avatar,
        experience: data.experience,
      },
    });
    return ok({ ...therapist, name: user.name, email: user.email }, 201);
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
