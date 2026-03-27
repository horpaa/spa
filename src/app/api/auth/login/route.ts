import { db } from "@/lib/db";
import { ok, err, handleZodError } from "@/lib/api-helpers";
import { loginSchema } from "@/lib/validations";
import { signToken, authCookieOptions } from "@/lib/auth";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = loginSchema.parse(body);

    const user = await db.user.findUnique({ where: { email: data.email } });
    if (!user) return err("Correo o contraseña incorrectos.", 401);

    // Users created via booking flow have random UUID passwords — they must register first
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return err("Correo o contraseña incorrectos.", 401);

    const token = await signToken({ sub: user.id, name: user.name, email: user.email, role: user.role });
    const cookieStore = await cookies();
    cookieStore.set(authCookieOptions(token));

    return ok({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Error interno del servidor.", 500);
  }
}
