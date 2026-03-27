import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Iniciar Sesión — Ariday Spa",
};

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F5F0] section-padding">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#E2D9CF] p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-2">
              Bienvenido de vuelta
            </p>
            <h1 className="font-playfair text-3xl font-semibold text-[#1A1A1A]">
              Iniciar Sesión
            </h1>
          </div>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
          <p className="text-center text-sm text-[#6B6B6B] mt-6">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[#C4956A] hover:underline font-medium">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
