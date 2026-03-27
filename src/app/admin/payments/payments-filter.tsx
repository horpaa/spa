"use client";

import { useState } from "react";
import { Search, Download, Plus, MoreHorizontal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string;
  paidAt: string | null;
  client: string;
  service: string;
  createdAt: string;
}

interface UnpaidAppointment {
  id: string;
  client: string;
  service: string;
  date: string;
  totalPrice: number;
}

const statusStyle: Record<string, string> = {
  PAGADO: "bg-green-50 text-green-600",
  PENDIENTE: "bg-amber-50 text-amber-600",
  REEMBOLSADO: "bg-red-50 text-red-500",
};

const methodLabel: Record<string, string> = {
  STRIPE: "Stripe",
  MANUAL: "Manual",
};

const emptyRegister = { appointmentId: "", amount: "", method: "MANUAL", status: "PAGADO" };

export default function PaymentsFilter({
  payments: initialPayments,
  unpaidAppointments,
}: {
  payments: Payment[];
  unpaidAppointments: UnpaidAppointment[];
}) {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "PAGADO" | "PENDIENTE" | "REEMBOLSADO">("all");

  // Register dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [form, setForm] = useState(emptyRegister);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.service.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || p.status === filter;
    return matchSearch && matchFilter;
  });

  const handleStatusChange = async (payment: Payment, newStatus: string) => {
    const res = await fetch(`/api/payments/${payment.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setPayments((prev) =>
        prev.map((p) =>
          p.id === payment.id
            ? { ...p, status: data.data.status, paidAt: data.data.paidAt, method: data.data.method }
            : p
        )
      );
    } else {
      alert(data.error ?? "Error al actualizar el pago.");
    }
  };

  const handleAppointmentSelect = (id: string) => {
    const appt = unpaidAppointments.find((a) => a.id === id);
    setForm((f) => ({ ...f, appointmentId: id, amount: appt ? String(appt.totalPrice) : f.amount }));
  };

  const handleRegister = async () => {
    const amount = parseFloat(form.amount);
    if (!form.appointmentId) { setError("Selecciona una cita."); return; }
    if (!amount || amount <= 0) { setError("Ingresa un monto válido."); return; }
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: form.appointmentId,
          amount,
          method: form.method,
          status: form.status,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al registrar el pago.");
        return;
      }
      setPayments((prev) => [data.data, ...prev]);
      setOpenDialog(false);
      setForm(emptyRegister);
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border border-[#E2D9CF] px-3 py-2 w-56">
            <Search size={14} className="text-[#9A9A9A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar pagos..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-[#9A9A9A] text-[#1A1A1A]"
            />
          </div>
          <div className="flex gap-1">
            {(["all", "PAGADO", "PENDIENTE", "REEMBOLSADO"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium capitalize border transition-colors ${
                  filter === f
                    ? "bg-[#C4956A] text-white border-[#C4956A]"
                    : "bg-white text-[#6B6B6B] border-[#E2D9CF] hover:border-[#C4956A]"
                }`}
              >
                {f === "all" ? "todos" : f.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-[#E2D9CF] text-[#6B6B6B] rounded-none text-xs flex items-center gap-2 hover:border-[#C4956A] hover:text-[#C4956A]"
          >
            <Download size={13} />
            Exportar CSV
          </Button>
          <Button
            onClick={() => { setForm(emptyRegister); setError(null); setOpenDialog(true); }}
            className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none text-sm flex items-center gap-2"
          >
            <Plus size={15} />
            Registrar Pago
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2D9CF]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2D9CF]">
              {["Transacción", "Cliente", "Servicio", "Método", "Fecha", "Monto", "Estado", ""].map((h) => (
                <th key={h} className="text-left text-[10px] font-medium text-[#9A9A9A] uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-[#E2D9CF]/50 hover:bg-[#F8F5F0] transition-colors">
                <td className="px-5 py-3.5 font-mono text-xs text-[#9A9A9A]">{p.id.slice(0, 8)}...</td>
                <td className="px-5 py-3.5 font-medium text-[#1A1A1A] text-sm">{p.client}</td>
                <td className="px-5 py-3.5 text-xs text-[#6B6B6B]">{p.service}</td>
                <td className="px-5 py-3.5 text-xs text-[#6B6B6B]">{methodLabel[p.method] ?? p.method}</td>
                <td className="px-5 py-3.5 text-xs text-[#6B6B6B]">
                  {new Date(p.paidAt ?? p.createdAt).toLocaleDateString("es-MX", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="px-5 py-3.5 font-semibold text-[#1A1A1A]">${p.amount}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-[10px] font-medium px-2 py-1 capitalize ${statusStyle[p.status] ?? "bg-gray-50 text-gray-600"}`}>
                    {p.status.toLowerCase()}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="w-7 h-7 flex items-center justify-center border border-[#E2D9CF] hover:border-[#C4956A] transition-colors">
                        <MoreHorizontal size={14} className="text-[#6B6B6B]" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      {p.status !== "PAGADO" && (
                        <DropdownMenuItem
                          className="text-xs gap-2 cursor-pointer text-green-600"
                          onClick={() => handleStatusChange(p, "PAGADO")}
                        >
                          Marcar como Pagado
                        </DropdownMenuItem>
                      )}
                      {p.status !== "PENDIENTE" && (
                        <DropdownMenuItem
                          className="text-xs gap-2 cursor-pointer text-amber-600"
                          onClick={() => handleStatusChange(p, "PENDIENTE")}
                        >
                          Marcar Pendiente
                        </DropdownMenuItem>
                      )}
                      {p.status !== "REEMBOLSADO" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-xs gap-2 cursor-pointer text-red-500"
                            onClick={() => handleStatusChange(p, "REEMBOLSADO")}
                          >
                            Reembolsar
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#9A9A9A]">
            No se encontraron pagos.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-[#9A9A9A]">
        <span>Mostrando {filtered.length} de {payments.length} transacciones</span>
      </div>

      {/* Register Payment Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-xl font-semibold text-[#1A1A1A]">
              Registrar Pago Manual
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                Cita
              </label>
              {unpaidAppointments.length === 0 ? (
                <p className="text-xs text-[#9A9A9A] py-2">Todas las citas ya tienen un pago registrado.</p>
              ) : (
                <select
                  value={form.appointmentId}
                  onChange={(e) => handleAppointmentSelect(e.target.value)}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                >
                  <option value="">— Selecciona una cita —</option>
                  {unpaidAppointments.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.client} · {a.service} · {new Date(a.date).toLocaleDateString("es-MX", { month: "short", day: "numeric", year: "numeric" })}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Monto ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                  Método
                </label>
                <select
                  value={form.method}
                  onChange={(e) => setForm((f) => ({ ...f, method: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                >
                  <option value="MANUAL">Manual</option>
                  <option value="STRIPE">Stripe</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
                Estado
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
              >
                <option value="PAGADO">Pagado</option>
                <option value="PENDIENTE">Pendiente</option>
              </select>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenDialog(false)}
              className="border-[#E2D9CF] text-[#6B6B6B] rounded-none"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleRegister}
              disabled={saving || unpaidAppointments.length === 0}
              className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none flex items-center gap-2"
            >
              {saving && <Loader2 size={13} className="animate-spin" />}
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
