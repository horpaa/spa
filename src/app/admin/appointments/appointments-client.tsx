"use client";

import { useState } from "react";
import { Search, MoreHorizontal, CheckCircle, Clock, XCircle, CalendarCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Appointment {
  id: string;
  client: string;
  clientEmail: string;
  service: string;
  therapist: string | null;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  notes: string;
  totalPrice: number;
  paymentStatus: string | null;
  createdAt: string;
}

interface Counts {
  total: number;
  pendiente: number;
  confirmada: number;
  completada: number;
  cancelada: number;
}

const statusStyle: Record<string, string> = {
  PENDIENTE: "bg-amber-50 text-amber-600",
  CONFIRMADA: "bg-blue-50 text-blue-600",
  COMPLETADA: "bg-green-50 text-green-600",
  CANCELADA: "bg-red-50 text-red-500",
};

const paymentStyle: Record<string, string> = {
  PAGADO: "text-green-600",
  PENDIENTE: "text-amber-600",
  REEMBOLSADO: "text-red-500",
};

const STATUS_TRANSITIONS: Record<string, { label: string; next: string; color: string }[]> = {
  PENDIENTE: [
    { label: "Confirmar", next: "CONFIRMADA", color: "text-blue-600" },
    { label: "Completar", next: "COMPLETADA", color: "text-green-600" },
  ],
  CONFIRMADA: [
    { label: "Completar", next: "COMPLETADA", color: "text-green-600" },
  ],
  COMPLETADA: [],
  CANCELADA: [
    { label: "Restaurar a Pendiente", next: "PENDIENTE", color: "text-amber-600" },
  ],
};

export default function AppointmentsClient({
  appointments: initial,
  counts: initialCounts,
}: {
  appointments: Appointment[];
  counts: Counts;
}) {
  const [appointments, setAppointments] = useState(initial);
  const [counts, setCounts] = useState(initialCounts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "PENDIENTE" | "CONFIRMADA" | "COMPLETADA" | "CANCELADA">("all");

  const filtered = appointments.filter((a) => {
    const matchSearch =
      a.client.toLowerCase().includes(search.toLowerCase()) ||
      a.service.toLowerCase().includes(search.toLowerCase()) ||
      (a.therapist ?? "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (appt: Appointment, newStatus: string) => {
    const res = await fetch(`/api/bookings/${appt.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      alert(data.error ?? "Error al actualizar la cita.");
      return;
    }
    setAppointments((prev) =>
      prev.map((a) => (a.id === appt.id ? { ...a, status: newStatus } : a))
    );
    setCounts((prev) => ({
      ...prev,
      [appt.status.toLowerCase()]: prev[appt.status.toLowerCase() as keyof Counts] - 1,
      [newStatus.toLowerCase()]: prev[newStatus.toLowerCase() as keyof Counts] + 1,
    }));
  };

  const summaryCards = [
    { label: "Total", value: counts.total, icon: CalendarCheck, color: "text-[#1A1A1A]" },
    { label: "Pendientes", value: counts.pendiente, icon: Clock, color: "text-amber-600" },
    { label: "Confirmadas", value: counts.confirmada, icon: CheckCircle, color: "text-blue-600" },
    { label: "Completadas", value: counts.completada, icon: CheckCircle, color: "text-green-600" },
    { label: "Canceladas", value: counts.cancelada, icon: XCircle, color: "text-red-500" },
  ];

  return (
    <div className="p-6 space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-5 gap-4">
        {summaryCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-white border border-[#E2D9CF] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#9A9A9A]">{s.label}</p>
                <p className={`font-playfair text-2xl font-semibold ${s.color}`}>{s.value}</p>
              </div>
              <Icon size={18} className={`${s.color} opacity-40`} />
            </div>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-[#E2D9CF] px-3 py-2 w-56">
          <Search size={14} className="text-[#9A9A9A]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar citas..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-[#9A9A9A] text-[#1A1A1A]"
          />
        </div>
        <div className="flex gap-1">
          {(["all", "PENDIENTE", "CONFIRMADA", "COMPLETADA", "CANCELADA"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-medium capitalize border transition-colors ${
                statusFilter === s
                  ? "bg-[#C4956A] text-white border-[#C4956A]"
                  : "bg-white text-[#6B6B6B] border-[#E2D9CF] hover:border-[#C4956A]"
              }`}
            >
              {s === "all" ? "todas" : s.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2D9CF]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E2D9CF]">
              {["Cliente", "Servicio", "Terapeuta", "Fecha / Hora", "Precio", "Pago", "Estado", ""].map((h) => (
                <th key={h} className="text-left text-[10px] font-medium text-[#9A9A9A] uppercase tracking-wider px-5 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => {
              const transitions = STATUS_TRANSITIONS[a.status] ?? [];
              return (
                <tr key={a.id} className="border-b border-[#E2D9CF]/50 hover:bg-[#F8F5F0] transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[#1A1A1A] text-sm">{a.client}</p>
                    <p className="text-[10px] text-[#9A9A9A]">{a.clientEmail}</p>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[#6B6B6B]">{a.service}</td>
                  <td className="px-5 py-3.5 text-xs text-[#6B6B6B]">{a.therapist ?? "—"}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-[#1A1A1A]">
                      {new Date(a.date).toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <p className="text-[10px] text-[#9A9A9A]">{a.startTime} – {a.endTime}</p>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-[#1A1A1A] text-sm">${a.totalPrice}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium capitalize ${a.paymentStatus ? paymentStyle[a.paymentStatus] : "text-[#9A9A9A]"}`}>
                      {a.paymentStatus ? a.paymentStatus.toLowerCase() : "sin pago"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-1 capitalize ${statusStyle[a.status] ?? "bg-gray-50 text-gray-600"}`}>
                      {a.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-7 h-7 flex items-center justify-center border border-[#E2D9CF] hover:border-[#C4956A] transition-colors">
                          <MoreHorizontal size={14} className="text-[#6B6B6B]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        {transitions.map((t) => (
                          <DropdownMenuItem
                            key={t.next}
                            className={`text-xs gap-2 cursor-pointer ${t.color}`}
                            onClick={() => updateStatus(a, t.next)}
                          >
                            {t.label}
                          </DropdownMenuItem>
                        ))}
                        {transitions.length > 0 && a.status !== "CANCELADA" && <DropdownMenuSeparator />}
                        {a.status !== "CANCELADA" && (
                          <DropdownMenuItem
                            className="text-xs gap-2 cursor-pointer text-red-500"
                            onClick={() => updateStatus(a, "CANCELADA")}
                          >
                            Cancelar cita
                          </DropdownMenuItem>
                        )}
                        {transitions.length === 0 && a.status === "COMPLETADA" && (
                          <DropdownMenuItem disabled className="text-xs text-[#9A9A9A]">
                            Sin acciones disponibles
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-[#9A9A9A]">
            No se encontraron citas.
          </div>
        )}
      </div>

      <div className="text-xs text-[#9A9A9A]">
        Mostrando {filtered.length} de {appointments.length} citas
      </div>
    </div>
  );
}
