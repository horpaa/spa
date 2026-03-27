import AdminTopbar from "@/components/admin/admin-topbar";
import { db } from "@/lib/db";
import UsersAdminClient from "./users-admin-client";

export default async function AdminUsersPage() {
  const raw = await db.user.findMany({
    include: {
      _count: { select: { appointments: true } },
      appointments: { select: { totalPrice: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const users = raw.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    createdAt: u.createdAt.toISOString(),
    appointmentCount: u._count.appointments,
    totalSpent: u.appointments.reduce((sum, a) => sum + Number(a.totalPrice), 0),
  }));

  return (
    <>
      <AdminTopbar title="Users" subtitle="Manage clients, therapists and admins" />
      <UsersAdminClient initialUsers={users} />
    </>
  );
}
