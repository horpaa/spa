import { ok } from "@/lib/api-helpers";
import { clearCookieOptions } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(clearCookieOptions());
  return ok({ loggedOut: true });
}
