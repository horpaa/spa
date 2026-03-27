import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  updateUser: (partial: Partial<AuthUser>) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  updateUser: (partial) => set((state) => ({ user: state.user ? { ...state.user, ...partial } : null })),
  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null });
    window.location.href = "/";
  },
}));
