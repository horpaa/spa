export type ServiceCategory = "massage" | "facial" | "body" | "nails" | "makeup";

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  icon: string;
  benefits: string[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "stone-spa",
    name: "Stone Spa",
    category: "massage",
    shortDescription: "Relajación profunda con piedras volcánicas calientes.",
    description:
      "Vive el arte ancestral de la terapia con piedras calientes. Piedras de basalto lisas y calientes se colocan en puntos clave del cuerpo para calentar y aflojar los músculos tensos, permitiendo un masaje más profundo. Promueve la relajación muscular profunda y alivia el dolor crónico.",
    price: 120,
    duration: 90,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop",
    icon: "🪨",
    benefits: ["Relajación muscular profunda", "Mejora la circulación", "Alivio del estrés", "Reduce la tensión muscular"],
    popular: true,
  },
  {
    id: "2",
    slug: "face-treatments",
    name: "Tratamientos Faciales",
    category: "facial",
    shortDescription: "Revitaliza tu piel con terapias faciales premium.",
    description:
      "Nuestros tratamientos faciales exclusivos utilizan ingredientes botánicos premium para limpiar en profundidad, exfoliar y nutrir tu piel. Adaptados a tu tipo de piel para máximo resplandor y luminosidad.",
    price: 85,
    duration: 60,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
    icon: "✨",
    benefits: ["Limpieza profunda", "Iluminación de la piel", "Antienvejecimiento", "Hidratación intensiva"],
    popular: true,
  },
  {
    id: "3",
    slug: "body-massage",
    name: "Masaje Corporal",
    category: "massage",
    shortDescription: "Relajación corporal completa con técnicas terapéuticas expertas.",
    description:
      "Un masaje corporal completo que combina técnicas suecas y de tejido profundo para aliviar la tensión, mejorar la circulación y restaurar el equilibrio natural de tu cuerpo.",
    price: 95,
    duration: 60,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop",
    icon: "💆",
    benefits: ["Alivio de la tensión", "Mejora la flexibilidad", "Refuerza la inmunidad", "Claridad mental"],
  },
  {
    id: "4",
    slug: "aromatherapy",
    name: "Aromaterapia",
    category: "massage",
    shortDescription: "Aromas curativos y toque suave para mente y cuerpo.",
    description:
      "Combinamos el poder terapéutico de los aceites esenciales con técnicas de masaje suaves. Cada sesión se personaliza con aceites elegidos para tus necesidades: lavanda calmante, cítricos energizantes o eucalipto equilibrante.",
    price: 100,
    duration: 75,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop",
    icon: "🌿",
    benefits: ["Reducción del estrés", "Mejora del estado de ánimo", "Mejor calidad de sueño", "Equilibrio hormonal"],
  },
  {
    id: "5",
    slug: "manicure-pedicure",
    name: "Manicure & Pedicure",
    category: "nails",
    shortDescription: "Manos y pies perfectos con cuidado de uñas de lujo.",
    description:
      "Disfruta de nuestros servicios exclusivos de manicure y pedicure. Utilizamos productos premium y técnicas especializadas para que tus manos y pies luzcan y se sientan increíbles.",
    price: 65,
    duration: 90,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop",
    icon: "💅",
    benefits: ["Fortalecimiento de uñas", "Cuidado de cutículas", "Tratamiento hidratante", "Masaje relajante de pies"],
  },
  {
    id: "6",
    slug: "makeup",
    name: "Maquillaje Profesional",
    category: "makeup",
    shortDescription: "Maquillaje profesional para cualquier ocasión.",
    description:
      "Nuestros maquilladores profesionales crean looks deslumbrantes adaptados a tu estilo y ocasión. Desde looks naturales de día hasta maquillaje glamuroso para eventos especiales.",
    price: 75,
    duration: 60,
    image: "https://images.unsplash.com/photo-1487412840669-c2e6f77c0cae?w=800&auto=format&fit=crop",
    icon: "💄",
    benefits: ["Acabado profesional", "Larga duración", "Preparación de piel incluida", "Consulta de estilo"],
  },
  {
    id: "7",
    slug: "deep-tissue",
    name: "Masaje Tejido Profundo",
    category: "massage",
    shortDescription: "Terapia intensa dirigida a las capas musculares profundas.",
    description:
      "Diseñado para aliviar la tensión severa en músculos y tejido conectivo. Este tipo de masaje se enfoca en los músculos ubicados debajo de la superficie de los músculos superiores.",
    price: 110,
    duration: 60,
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&auto=format&fit=crop",
    icon: "💪",
    benefits: ["Alivio del dolor crónico", "Mejora de postura", "Recuperación de lesiones", "Reducción de inflamación"],
    popular: true,
  },
  {
    id: "8",
    slug: "body-scrub",
    name: "Exfoliación Corporal",
    category: "body",
    shortDescription: "Exfolia y nutre tu piel de pies a cabeza.",
    description:
      "Un lujoso tratamiento de exfoliación corporal completa con sal marina natural y extractos botánicos, seguido de un envolvimiento nutritivo que sella la humedad y deja la piel suave como seda.",
    price: 90,
    duration: 75,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop",
    icon: "🌊",
    benefits: ["Exfoliación profunda", "Suavidad de piel", "Desintoxicante", "Mejora el tono de piel"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category);
}

export function getPopularServices(): Service[] {
  return services.filter((s) => s.popular);
}
