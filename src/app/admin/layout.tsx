import AdminSidebar from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Admin Panel — Ariday Spa",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-[#F8F5F0] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-60 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
