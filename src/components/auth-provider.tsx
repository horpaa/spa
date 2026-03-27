"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setUser(data?.success ? data.data : null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [setUser, setLoading]);

  return <>{children}</>;
}
