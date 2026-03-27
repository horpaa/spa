import { db } from "@/lib/db";
import { ok } from "@/lib/api-helpers";

export async function GET() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalRevenue,
    monthlyRevenue,
    monthlyAppointments,
    clientCount,
    pendingPayments,
    recentAppointments,
    serviceBookings,
  ] = await Promise.all([
    db.payment.aggregate({ where: { status: "PAGADO" }, _sum: { amount: true } }),
    db.payment.aggregate({
      where: { status: "PAGADO", paidAt: { gte: startOfMonth } },
      _sum: { amount: true },
    }),
    db.appointment.count({ where: { createdAt: { gte: startOfMonth } } }),
    db.user.count({ where: { role: "CLIENTE" } }),
    db.payment.count({ where: { status: "PENDIENTE" } }),
    db.appointment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { client: true, service: true, therapist: { include: { user: true } } },
    }),
    db.appointment.groupBy({
      by: ["serviceId"],
      _count: { serviceId: true },
      _sum: { totalPrice: true },
      orderBy: { _count: { serviceId: "desc" } },
      take: 5,
    }),
  ]);

  const serviceIds = serviceBookings.map((s) => s.serviceId);
  const services = await db.service.findMany({ where: { id: { in: serviceIds } } });
  const serviceMap = Object.fromEntries(services.map((s) => [s.id, s.name]));

  return ok({
    totalRevenue: Number(totalRevenue._sum.amount ?? 0),
    monthlyRevenue: Number(monthlyRevenue._sum.amount ?? 0),
    monthlyAppointments,
    clientCount,
    pendingPayments,
    recentAppointments: recentAppointments.map((a) => ({
      id: a.id,
      client: a.client.name,
      service: a.service.name,
      therapist: a.therapist?.user.name ?? "Sin asignar",
      date: a.date,
      startTime: a.startTime,
      totalPrice: Number(a.totalPrice),
      status: a.status,
    })),
    topServices: serviceBookings.map((s) => ({
      serviceId: s.serviceId,
      name: serviceMap[s.serviceId] ?? "Unknown",
      bookings: s._count.serviceId,
      revenue: Number(s._sum.totalPrice ?? 0),
    })),
  });
}
