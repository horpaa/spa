export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sofía Martínez",
    role: "Cliente Frecuente",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b9e0?w=150&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "El tratamiento Stone Spa fue absolutamente transformador. Salí sintiéndome como una persona completamente diferente: relajada, renovada y radiante. La terapeuta fue increíblemente hábil.",
    service: "Stone Spa",
  },
  {
    id: "2",
    name: "Valentina Cruz",
    role: "Clienta Regular",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "Mi tratamiento facial en Ariday fue el mejor que he tenido. Mi piel lució radiante durante semanas. Los productos que usan son divinos y el ambiente es puro lujo.",
    service: "Tratamientos Faciales",
  },
  {
    id: "3",
    name: "Isabella Romero",
    role: "Primera Visita",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "Reservé la sesión de aromaterapia para mi cumpleaños y superó todas mis expectativas. El proceso de reserva fue muy sencillo y toda la experiencia fue mágica.",
    service: "Aromaterapia",
  },
  {
    id: "4",
    name: "Camila Torres",
    role: "Miembro Mensual",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "Ariday se ha convertido en mi santuario mensual. El masaje de tejido profundo ha hecho maravillas con mi dolor de espalda crónico. Profesional, cálido y genuinamente terapéutico.",
    service: "Masaje Tejido Profundo",
  },
  {
    id: "5",
    name: "Lucía Vargas",
    role: "Entusiasta del Bienestar",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "La exfoliación corporal dejó mi piel increíblemente suave. El personal es atento, profesional y te hace sentir verdaderamente especial. Una experiencia de cinco estrellas.",
    service: "Exfoliación Corporal",
  },
  {
    id: "6",
    name: "Andrés Navarro",
    role: "Cliente Corporativo",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&crop=face",
    rating: 5,
    text: "Traje a mi equipo para un día de bienestar y todos salieron renovados y recargados. Servicio excepcional, espacio hermoso y la reserva fue increíblemente sencilla.",
    service: "Masaje Corporal",
  },
];
