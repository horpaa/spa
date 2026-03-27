import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { registerSchema } from "@/lib/validations";
import { signToken, authCookieOptions } from "@/lib/auth";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = registerSchema.parse(body);

    const existing = await db.user.findUnique({ where: { email: data.email } });
    if (existing) return err("Este correo ya está registrado.", 409);

    const hashed = await bcrypt.hash(data.password, 10);
    const user = await db.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashed,
        phone: data.phone,
        role: "CLIENTE",
      },
    });

    const token = await signToken({ sub: user.id, name: user.name, email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set(authCookieOptions(token));

    return ok({ id: user.id, name: user.name, email: user.email, role: user.role }, 201);
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Error interno del servidor.", 500);
  }
}
