export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string[];
  bio: string;
  avatar: string;
  experience: number;
  rating: number;
}

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Elena Morales",
    role: "Terapeuta Principal",
    specialty: ["Stone Spa", "Aromaterapia", "Tejido Profundo"],
    bio: "Con más de 12 años de experiencia, Elena es nuestra terapeuta más solicitada. Formada en técnicas asiáticas y europeas tradicionales.",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&crop=face",
    experience: 12,
    rating: 5.0,
  },
  {
    id: "2",
    name: "Marina Delgado",
    role: "Especialista en Cuidado de Piel",
    specialty: ["Tratamientos Faciales", "Exfoliación Corporal", "Maquillaje"],
    bio: "Marina es esteticista certificada especializada en tratamientos faciales avanzados y cuidado holístico de la piel.",
    avatar: "https://images.unsplash.com/photo-1614436163996-25cee5f54290?w=400&auto=format&fit=crop&crop=face",
    experience: 8,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Carlos Rivera",
    role: "Terapeuta de Masajes Deportivos",
    specialty: ["Masaje Corporal", "Tejido Profundo", "Aromaterapia"],
    bio: "Terapeuta de masajes deportivos certificado con experiencia en recuperación de lesiones y mejora del rendimiento.",
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&crop=face",
    experience: 9,
    rating: 4.8,
  },
  {
    id: "4",
    name: "Isabela Santos",
    role: "Artista de Uñas y Belleza",
    specialty: ["Manicure & Pedicure", "Maquillaje", "Tratamientos Faciales"],
    bio: "Artista de uñas y especialista en maquillaje galardonada, creando looks impecables para cada ocasión.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&auto=format&fit=crop&crop=face",
    experience: 6,
    rating: 4.9,
  },
];
