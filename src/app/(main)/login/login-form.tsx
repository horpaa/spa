"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/";
  const { setUser } = useAuthStore();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al iniciar sesión.");
        return;
      }
      setUser(data.data);
      router.push(next);
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
          Contraseña
        </label>
        <input
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          placeholder="••••••••"
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
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </form>
  );
}
