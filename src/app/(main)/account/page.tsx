import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import AccountForm from "./account-form";

export const metadata = { title: "Mi Cuenta — Ariday" };

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=/account");

  const user = await db.user.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });
  if (!user) redirect("/login");

  return (
    <section className="section-padding bg-[#F8F5F0] min-h-screen">
      <div className="container-spa max-w-xl">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-semibold text-[#1A1A1A] mb-1">Mi Cuenta</h1>
          <p className="text-sm text-[#6B6B6B]">Actualiza tu información personal.</p>
        </div>
        <AccountForm user={user} />
      </div>
    </section>
  );
}
