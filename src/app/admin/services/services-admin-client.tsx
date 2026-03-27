"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Clock, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { ApiService } from "@/lib/types";

const categoryColors: Record<string, string> = {
  MASAJES: "bg-blue-50 text-blue-600",
  FACIALES: "bg-pink-50 text-pink-600",
  CORPORALES: "bg-green-50 text-green-600",
  NAIL_SPA: "bg-purple-50 text-purple-600",
  MAQUILLAJE: "bg-amber-50 text-amber-600",
  AROMATERAPIA: "bg-teal-50 text-teal-600",
};

interface ServiceForm {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  price: string;
  duration: string;
  image: string;
}

const emptyForm: ServiceForm = {
  name: "",
  slug: "",
  category: "MASAJES",
  shortDescription: "",
  price: "",
  duration: "",
  image: "",
};

export default function ServicesAdminClient({ initialServices }: { initialServices: ApiService[] }) {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editTarget, setEditTarget] = useState<ApiService | null>(null);
  const [form, setForm] = useState<ServiceForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  const openEdit = (service: ApiService) => {
    setEditTarget(service);
    setForm({
      name: service.name,
      slug: service.slug,
      category: service.category,
      shortDescription: service.shortDescription,
      price: String(service.price),
      duration: String(service.duration),
      image: service.image ?? "",
    });
    setOpenDialog(true);
  };

  const openNew = () => {
    setEditTarget(null);
    setForm(emptyForm);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        category: form.category,
        shortDescription: form.shortDescription,
        description: form.shortDescription,
        price: parseFloat(form.price),
        duration: parseInt(form.duration),
        image: form.image || undefined,
      };

      const url = editTarget ? `/api/services/${editTarget.id}` : "/api/services";
      const method = editTarget ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error ?? "Error al guardar el servicio.");
        return;
      }
      if (editTarget) {
        setServices((prev) => prev.map((s) => (s.id === editTarget.id ? data.data : s)));
      } else {
        setServices((prev) => [...prev, data.data]);
      }
      setOpenDialog(false);
    } catch {
      setError("Error de conexión.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Desactivar este servicio?")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      <div className="p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white border border-[#E2D9CF] px-3 py-2 w-64">
            <Search size={14} className="text-[#9A9A9A]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-[#9A9A9A] text-[#1A1A1A]"
            />
          </div>
          <Button
            onClick={openNew}
            className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none text-sm flex items-center gap-2"
          >
            <Plus size={15} />
            Add Service
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white border border-[#E2D9CF]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2D9CF]">
                {["Service", "Category", "Duration", "Price", "Status", ""].map((h) => (
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
              {filtered.map((service) => (
                <tr
                  key={service.id}
                  className="border-b border-[#E2D9CF]/50 hover:bg-[#F8F5F0] transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 bg-cover bg-center flex-shrink-0"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div>
                        <p className="font-medium text-[#1A1A1A] text-sm">{service.name}</p>
                        <p className="text-xs text-[#9A9A9A] line-clamp-1 max-w-48">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-medium px-2 py-1 capitalize ${categoryColors[service.category] ?? "bg-gray-50 text-gray-600"}`}>
                      {service.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1 text-sm text-[#6B6B6B]">
                      <Clock size={12} />
                      {service.duration} min
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-semibold text-[#1A1A1A]">${service.price}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-medium px-2 py-1 ${service.isPopular ? "bg-[#C4956A]/10 text-[#C4956A]" : "bg-green-50 text-green-600"}`}>
                      {service.isPopular ? "Popular" : "Active"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-7 h-7 flex items-center justify-center border border-[#E2D9CF] hover:border-[#C4956A] transition-colors">
                          <MoreHorizontal size={14} className="text-[#6B6B6B]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem className="text-xs gap-2 cursor-pointer" onClick={() => openEdit(service)}>
                          <Pencil size={12} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs gap-2 cursor-pointer" asChild>
                          <a href={`/services/${service.slug}`} target="_blank" rel="noreferrer">
                            <Eye size={12} />
                            View on site
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-xs gap-2 cursor-pointer text-red-500"
                          onClick={() => handleDelete(service.id)}
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

        <div className="flex items-center justify-between mt-4 text-xs text-[#9A9A9A]">
          <span>Showing {filtered.length} of {services.length} services</span>
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-playfair text-xl font-semibold text-[#1A1A1A]">
              {editTarget ? `Edit — ${editTarget.name}` : "Add New Service"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
                >
                  {["MASAJES", "FACIALES", "CORPORALES", "NAIL_SPA", "AROMATERAPIA", "MAQUILLAJE"].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Short Description</label>
              <input
                value={form.shortDescription}
                onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Price ($)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Duration (min)</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#1A1A1A] uppercase tracking-wider mb-1.5">Image URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="w-full border border-[#E2D9CF] focus:border-[#C4956A] outline-none px-3 py-2 text-sm text-[#1A1A1A] bg-white"
              />
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)} className="border-[#E2D9CF] text-[#6B6B6B] rounded-none">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-[#C4956A] hover:bg-[#A0784A] text-white rounded-none flex items-center gap-2">
              {saving && <Loader2 size={13} className="animate-spin" />}
              {editTarget ? "Save Changes" : "Create Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
