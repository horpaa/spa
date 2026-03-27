import { ok, err } from "@/lib/api-helpers";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return err("No autenticado.", 401);
  return ok({ id: session.sub, name: session.name, email: session.email, role: session.role });
}
