"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError("Error al enviar el mensaje. Intenta de nuevo.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-10">
        <CheckCircle size={48} className="text-[#C4956A] mx-auto mb-4" />
        <h3 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-[#6B6B6B] text-sm">
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
            Tu Nombre
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Nombre completo"
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
            onChange={(e) => update("email", e.target.value)}
            placeholder="tu@correo.com"
            className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
          Asunto
        </label>
        <input
          type="text"
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="¿En qué podemos ayudarte?"
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-2">
          Mensaje
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Escribe tu mensaje aquí..."
          className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-4 py-3 text-sm bg-white placeholder:text-[#9A9A9A] transition-colors resize-none"
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
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </Button>
    </form>
  );
}
