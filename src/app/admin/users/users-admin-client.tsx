"use client";

import { useState } from "react";
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Ban, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

interface ApiUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
  appointmentCount: number;
  totalSpent: number;
}

const roleStyle: Record<string, string> = {
  CLIENTE: "bg-blue-50 text-blue-600",
  TERAPEUTA: "bg-purple-50 text-purple-600",
  ADMIN: "bg-[#C4956A]/10 text-[#C4956A]",
};

interface UserForm {
  name: string;
  email: string;
  phone: string;
  role: string;
  newPassword: string;
  confirmPassword: string;
}

const emptyForm: UserForm = { name: "", email: "", phone: "", role: "CLIENTE", newPassword: "", confirmPassword: "" };

export default function UsersAdminClient({ initialUsers }: { initialUsers: ApiUser[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "CLIENTE" | "TERAPEUTA" | "ADMIN">("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<ApiUser | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(emptyForm);

  const openNew = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setError(null);
    setOpenDialog(true);
  };

  const openEdit = (user: ApiUser) => {
    setEditTarget(user);
    setForm({ name: user.name, email: user.email, phone: user.phone ?? "", role: user.role, newPassword: "", confirmPassword: "" });
    setError(null);
    setOpenDialog(true);
  };

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleSave = async () => {
    if (form.newPassword && form.newPassword !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (form.newPassword && form.newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: Record<string, string> = { name: form.name, email: form.email, role: form.role };
      if (form.phone) payload.phone = form.phone;
      if (form.newPassword) payload.password = form.newPassword;
      const url = editTarget ? `/api/users/${editTarget.id}` : "/api/users";
      const method = editTarget ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al guardar el usuario.");
        return;
      }
      if (editTarget) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editTarget.id
              ? { ...u, name: data.data.name, email: data.data.email, phone: data.data.phone, role: data.data.role }
              : u
          )
        );
      } else {
        setUsers((prev) => [{ ...data.data, appointmentCount: 0, totalSpent: 0 }, ...prev]);
      }
      setOpenDialog(false);
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este usuario?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok && data.success) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } else {
      alert(data.error ?? "No se pudo eliminar el usuario.");
    }
  };

  return (
    <>
      <div className="p-6 space-y-5">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: users.length, color: "text-[#1A1A1A]" },
            { label: "Clients", value: users.filter((u) => u.role === "CLIENTE").length, color: "text-blue-600" },
            { label: "Therapists", value: users.filter((u) => u.role === "TERAPEUTA").length, color: "text-purple-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-[#E2D9CF] px-5 py-4 flex items-center justify-between">
              <span className="text-xs text-[#9A9A9A]">{s.label}</span>
              <span className={`font-playfair text-2xl font-semibold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-[#E2D9CF] px-3 py-2 w-56">
              <Search size={14} className="text-[#9A9A9A]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users..."
                className="bg-transparent text-sm outline-none w-full placeholder:text-[#9A9A9A] text-[#1A1A1A]"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "CLIENTE", "TERAPEUTA", "ADMIN"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 text-xs font-medium capitalize border transition-colors ${
                    roleFilter === r
                      ? "bg-[#C4956A] text-white border-[#C4956A]"
                      : "bg-white text-[#6B6B6B] border-[#E2D9CF] hover:border-[#C4956A]"
                  }`}
                >
                  {r === "all" ? "all" : r.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
          <Button
            onClick={openNew}
            className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none text-sm flex items-center gap-2"
          >
            <Plus size={15} />
            Add User
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E2D9CF]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2D9CF]">
                {["User", "Contact", "Role", "Appointments", "Total Spent", ""].map((h) => (
                  <th key={h} className="text-left text-[10px] font-medium text-[#9A9A9A] uppercase tracking-wider px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-[#E2D9CF]/50 hover:bg-[#F8F5F0] transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-[#C4956A]/20 text-[#C4956A] text-xs">
                          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#1A1A1A] text-sm">{user.name}</p>
                        <p className="text-[10px] text-[#9A9A9A]">
                          {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-[#6B6B6B]">{user.email}</p>
                    <p className="text-[10px] text-[#9A9A9A]">{user.phone ?? "—"}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-[10px] font-medium px-2 py-1 capitalize flex items-center gap-1 w-fit ${roleStyle[user.role] ?? "bg-gray-50 text-gray-600"}`}>
                      {user.role === "ADMIN" && <ShieldCheck size={10} />}
                      {user.role.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#6B6B6B]">{user.appointmentCount}</td>
                  <td className="px-5 py-3.5 font-semibold text-[#1A1A1A] text-sm">
                    {user.totalSpent > 0 ? `$${user.totalSpent}` : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-7 h-7 flex items-center justify-center border border-[#E2D9CF] hover:border-[#C4956A] transition-colors">
                          <MoreHorizontal size={14} className="text-[#6B6B6B]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="text-xs gap-2 cursor-pointer" onClick={() => openEdit(user)}>
                          <Pencil size={12} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-xs gap-2 cursor-pointer text-amber-600">
                          <Ban size={12} />
                          Suspend
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs gap-2 cursor-pointer text-red-500"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={12} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-[#9A9A9A]">
          <span>Showing {filtered.length} of {users.length} users</span>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-xl font-semibold text-[#1A1A1A]">
              {editTarget ? `Edit — ${editTarget.name}` : "Add New User"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                >
                  <option value="CLIENTE">cliente</option>
                  <option value="TERAPEUTA">terapeuta</option>
                  <option value="ADMIN">admin</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                placeholder="(555) 000-0000"
              />
            </div>
            <div className="border-t border-[#E2D9CF] pt-3">
              <p className="text-[10px] font-medium text-[#9A9A9A] uppercase tracking-wider mb-3">
                Contraseña <span className="normal-case tracking-normal">(dejar en blanco para no cambiar)</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Nueva</label>
                  <input
                    type="password"
                    value={form.newPassword}
                    onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                    className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                    placeholder="Mín. 6 caracteres"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Confirmar</label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                    className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm bg-white"
                    placeholder="Repite la contraseña"
                  />
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)} className="border-[#E2D9CF] text-[#6B6B6B] rounded-none">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none flex items-center gap-2">
              {saving && <Loader2 size={13} className="animate-spin" />}
              {editTarget ? "Guardar Cambios" : "Create User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
