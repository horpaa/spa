"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone: form.phone || undefined }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al crear la cuenta.");
        return;
      }
      setUser(data.data);
      router.push("/booking");
      router.refresh();
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
          Nombre Completo
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Tu nombre completo"
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
          Correo Electrónico
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          placeholder="tu@correo.com"
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
          Teléfono{" "}
          <span className="text-[#9A9A9A] normal-case tracking-normal font-normal">(opcional)</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          placeholder="(55) 1234-5678"
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
          Contraseña
        </label>
        <input
          type="password"
          required
          minLength={6}
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          placeholder="Mínimo 6 caracteres"
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3">{error}</p>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none font-medium py-3 h-auto tracking-wide disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </Button>
    </form>
  );
}
