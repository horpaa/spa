import { Metadata } from "next";
import RegisterForm from "./register-form";

export const metadata: Metadata = {
  title: "Crear Cuenta — Ariday Spa",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F5F0] section-padding">
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#E2D9CF] p-8 md:p-10">
          <div className="text-center mb-8">
            <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-2">
              Únete a Ariday
            </p>
            <h1 className="font-playfair text-3xl font-semibold text-[#1A1A1A]">
              Crear Cuenta
            </h1>
          </div>
          <RegisterForm />
          <p className="text-center text-sm text-[#6B6B6B] mt-6">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-[#C4956A] hover:underline font-medium">
              Inicia sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
