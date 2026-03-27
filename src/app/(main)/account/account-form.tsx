"use client";

import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/auth-store";

interface Props {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
  };
}

export default function AccountForm({ user }: Props) {
  const { updateUser } = useAuthStore();
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone ?? "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    setSuccess(false);
    try {
      const payload: Record<string, string> = {
        name: form.name,
        email: form.email,
      };
      if (form.phone) payload.phone = form.phone;
      if (form.newPassword) payload.password = form.newPassword;

      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al guardar los cambios.");
        return;
      }
      updateUser({ name: data.data.name, email: data.data.email });
      setSuccess(true);
      setForm((prev) => ({ ...prev, newPassword: "", confirmPassword: "" }));
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E2D9CF] p-8 space-y-5">
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
          Nombre completo
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2.5 text-sm bg-white"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
          Correo electrónico
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2.5 text-sm bg-white"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">
          Teléfono
        </label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2.5 text-sm bg-white"
          placeholder="(555) 000-0000"
        />
      </div>

      <div className="border-t border-[#E2D9CF] pt-5">
        <p className="text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-4">
          Cambiar contraseña <span className="normal-case text-[#9A9A9A] tracking-normal">(opcional)</span>
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#6B6B6B] mb-1.5">Nueva contraseña</label>
            <input
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2.5 text-sm bg-white"
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div>
            <label className="block text-xs text-[#6B6B6B] mb-1.5">Confirmar contraseña</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2.5 text-sm bg-white"
              placeholder="Repite la contraseña"
            />
          </div>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between gap-4">
        <div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          {success && (
            <p className="text-green-600 text-xs flex items-center gap-1.5">
              <CheckCircle size={13} />
              Cambios guardados correctamente.
            </p>
          )}
        </div>
        <Button
          type="submit"
          disabled={saving}
          className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none flex items-center gap-2"
        >
          {saving && <Loader2 size={13} className="animate-spin" />}
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
}
