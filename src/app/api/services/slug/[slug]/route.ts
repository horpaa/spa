import { db } from "@/lib/db";
import { ok, err } from "@/lib/api-helpers";

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });
  if (!service) return err("Service not found", 404);
  return ok({ ...service, price: Number(service.price) });
}
