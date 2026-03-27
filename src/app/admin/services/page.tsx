import AdminTopbar from "@/components/admin/admin-topbar";
import { db } from "@/lib/db";
import ServicesAdminClient from "./services-admin-client";
import type { ApiService } from "@/lib/types";

export default async function AdminServicesPage() {
  const raw = await db.service.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
  const services: ApiService[] = raw.map((s) => ({ ...s, price: Number(s.price) }));

  return (
    <>
      <AdminTopbar title="Services" subtitle="Manage your spa treatments and pricing" />
      <ServicesAdminClient initialServices={services} />
    </>
  );
}
