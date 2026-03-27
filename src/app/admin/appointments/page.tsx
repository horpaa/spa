import AdminTopbar from "@/components/admin/admin-topbar";
import { db } from "@/lib/db";
import AppointmentsClient from "./appointments-client";

export default async function AdminAppointmentsPage() {
  const appointments = await db.appointment.findMany({
    include: {
      client: true,
      therapist: { include: { user: true } },
      service: true,
      payment: true,
    },
    orderBy: { date: "desc" },
  });

  const serialized = appointments.map((a) => ({
    id: a.id,
    client: a.client.name,
    clientEmail: a.client.email,
    service: a.service.name,
    therapist: a.therapist?.user.name ?? null,
    date: a.date.toISOString(),
    startTime: a.startTime,
    endTime: a.endTime,
    status: a.status,
    notes: a.notes ?? "",
    totalPrice: Number(a.totalPrice),
    paymentStatus: a.payment?.status ?? null,
    createdAt: a.createdAt.toISOString(),
  }));

  const counts = {
    total: appointments.length,
    pendiente: appointments.filter((a) => a.status === "PENDIENTE").length,
    confirmada: appointments.filter((a) => a.status === "CONFIRMADA").length,
    completada: appointments.filter((a) => a.status === "COMPLETADA").length,
    cancelada: appointments.filter((a) => a.status === "CANCELADA").length,
  };

  return (
    <>
      <AdminTopbar title="Citas" subtitle="Gestiona y actualiza el estado de las citas" />
      <AppointmentsClient appointments={serialized} counts={counts} />
    </>
  );
}
