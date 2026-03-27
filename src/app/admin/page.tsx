import AdminTopbar from "@/components/admin/admin-topbar";
import {
  TrendingUp,
  Users,
  CalendarCheck,
  DollarSign,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";

const statusStyle: Record<string, string> = {
  CONFIRMADA: "bg-blue-50 text-blue-600",
  PENDIENTE: "bg-amber-50 text-amber-600",
  COMPLETADA: "bg-green-50 text-green-600",
  CANCELADA: "bg-red-50 text-red-500",
};

export default async function AdminDashboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    totalRevenue,
    monthlyAppointments,
    clientCount,
    pendingPaymentsCount,
    recentAppointments,
    serviceBookings,
  ] = await Promise.all([
    db.payment.aggregate({ where: { status: "PAGADO" }, _sum: { amount: true } }),
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

  const maxBookings = serviceBookings[0]?._count.serviceId ?? 1;

  const stats = [
    {
      label: "Total Revenue",
      value: `$${Number(totalRevenue._sum.amount ?? 0).toLocaleString()}`,
      icon: DollarSign,
      sub: "pagado",
    },
    {
      label: "Appointments",
      value: String(monthlyAppointments),
      icon: CalendarCheck,
      sub: "this month",
    },
    {
      label: "Active Clients",
      value: String(clientCount),
      icon: Users,
      sub: "registered users",
    },
    {
      label: "Pending Payments",
      value: String(pendingPaymentsCount),
      icon: TrendingUp,
      sub: "awaiting payment",
    },
  ];

  return (
    <>
      <AdminTopbar title="Dashboard" subtitle="Welcome back — here's what's happening today" />

      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white border border-[#E2D9CF] p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-9 h-9 bg-[#F8F5F0] border border-[#E2D9CF] flex items-center justify-center">
                    <Icon size={16} className="text-[#C4956A]" />
                  </div>
                </div>
                <p className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-0.5">
                  {s.value}
                </p>
                <p className="text-xs text-[#9A9A9A]">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent appointments */}
          <div className="lg:col-span-2 bg-white border border-[#E2D9CF]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2D9CF]">
              <h2 className="font-playfair text-base font-semibold text-[#1A1A1A]">
                Recent Appointments
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E2D9CF]">
                    {["Client", "Service", "Date", "Amount", "Status"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-[10px] font-medium text-[#9A9A9A] uppercase tracking-wider px-5 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="border-b border-[#E2D9CF]/50 hover:bg-[#F8F5F0] transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium text-[#1A1A1A]">{apt.client.name}</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-[#6B6B6B]">{apt.service.name}</td>
                      <td className="px-5 py-3.5">
                        <span className="flex items-center gap-1 text-xs text-[#6B6B6B]">
                          <Clock size={11} />
                          {new Date(apt.date).toLocaleDateString("es-MX", { month: "short", day: "numeric" })} {apt.startTime}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#1A1A1A]">
                        ${Number(apt.totalPrice)}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-[10px] font-medium px-2 py-1 capitalize ${
                            statusStyle[apt.status] ?? "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {apt.status.toLowerCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {recentAppointments.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-5 py-8 text-center text-xs text-[#9A9A9A]">
                        No appointments yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top services */}
          <div className="bg-white border border-[#E2D9CF]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2D9CF]">
              <h2 className="font-playfair text-base font-semibold text-[#1A1A1A]">
                Top Services
              </h2>
              <span className="text-xs text-[#9A9A9A]">All time</span>
            </div>
            <div className="p-5 space-y-4">
              {serviceBookings.length === 0 && (
                <p className="text-xs text-[#9A9A9A] text-center py-4">No data yet</p>
              )}
              {serviceBookings.map((s) => {
                const pct = Math.round((s._count.serviceId / maxBookings) * 100);
                return (
                  <div key={s.serviceId}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-[#1A1A1A] font-medium">
                        {serviceMap[s.serviceId] ?? "Unknown"}
                      </span>
                      <span className="text-xs text-[#9A9A9A]">{s._count.serviceId} bookings</span>
                    </div>
                    <div className="w-full bg-[#F0EBE4] h-1.5">
                      <div
                        className="h-1.5 bg-[#C4956A] transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-[#9A9A9A] mt-1">
                      ${Number(s._sum.totalPrice ?? 0).toLocaleString()} revenue
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
