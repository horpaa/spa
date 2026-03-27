import AdminTopbar from "@/components/admin/admin-topbar";
import { db } from "@/lib/db";
import { DollarSign, TrendingUp, CreditCard, ArrowUpRight } from "lucide-react";
import PaymentsFilter from "./payments-filter";

export default async function AdminPaymentsPage() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [payments, totalRevenue, monthlyRevenue, pendingCount, unpaidAppointments] = await Promise.all([
    db.payment.findMany({
      include: { appointment: { include: { client: true, service: true } } },
      orderBy: { createdAt: "desc" },
    }),
    db.payment.aggregate({ where: { status: "PAGADO" }, _sum: { amount: true } }),
    db.payment.aggregate({ where: { status: "PAGADO", paidAt: { gte: startOfMonth } }, _sum: { amount: true } }),
    db.payment.count({ where: { status: "PENDIENTE" } }),
    db.appointment.findMany({
      where: { payment: null },
      include: { client: true, service: true },
      orderBy: { date: "desc" },
    }),
  ]);

  const summaryStats = [
    { label: "Total Collected", value: `$${Number(totalRevenue._sum.amount ?? 0).toLocaleString()}`, icon: DollarSign, change: "" },
    { label: "This Month", value: `$${Number(monthlyRevenue._sum.amount ?? 0).toLocaleString()}`, icon: TrendingUp, change: "" },
    { label: "Pending", value: `${pendingCount} payment${pendingCount !== 1 ? "s" : ""}`, icon: CreditCard, change: "" },
  ];

  const serialized = payments.map((p) => ({
    id: p.id,
    amount: Number(p.amount),
    status: p.status,
    method: p.method,
    paidAt: p.paidAt?.toISOString() ?? null,
    client: p.appointment.client.name,
    service: p.appointment.service.name,
    createdAt: p.createdAt.toISOString(),
  }));

  const serializedUnpaid = unpaidAppointments.map((a) => ({
    id: a.id,
    client: a.client.name,
    service: a.service.name,
    date: a.date.toISOString(),
    totalPrice: Number(a.totalPrice),
  }));

  return (
    <>
      <AdminTopbar title="Payments" subtitle="Track revenue and transaction history" />

      <div className="p-6 space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {summaryStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white border border-[#E2D9CF] p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#F8F5F0] border border-[#E2D9CF] flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#C4956A]" />
                </div>
                <div>
                  <p className="font-playfair text-xl font-semibold text-[#1A1A1A]">{s.value}</p>
                  <p className="text-xs text-[#9A9A9A]">{s.label}</p>
                </div>
                {s.change && (
                  <span className="ml-auto flex items-center gap-0.5 text-xs font-medium text-green-600">
                    <ArrowUpRight size={12} />
                    {s.change}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <PaymentsFilter payments={serialized} unpaidAppointments={serializedUnpaid} />
      </div>
    </>
  );
}
