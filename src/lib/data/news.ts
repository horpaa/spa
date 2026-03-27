export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "beneficios-terapia-piedras-calientes",
    title: "Los Beneficios Transformadores de la Terapia con Piedras Calientes",
    excerpt:
      "Descubre por qué el masaje con piedras calientes se ha convertido en uno de los tratamientos spa más populares del mundo y cómo puede transformar tu bienestar físico y mental.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop",
    author: "Elena Morales",
    date: "2026-02-15",
    category: "Bienestar",
    readTime: 5,
  },
  {
    id: "2",
    slug: "rutina-cuidado-piel-radiante",
    title: "Cómo Construir una Rutina de Cuidado de Piel para Lucir Radiante",
    excerpt:
      "Nuestras especialistas en cuidado de piel comparten sus mejores consejos para mantener una piel sana y luminosa entre tus visitas al spa.",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
    author: "Marina Delgado",
    date: "2026-02-01",
    category: "Cuidado de Piel",
    readTime: 4,
  },
  {
    id: "3",
    slug: "guia-aceites-esenciales-aromaterapia",
    title: "Guía de Aceites Esenciales: Encuentra tu Mezcla Perfecta de Aromaterapia",
    excerpt:
      "Desde lavanda hasta eucalipto, aprende cómo los diferentes aceites esenciales pueden mejorar tu estado de ánimo, salud y bienestar general.",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&auto=format&fit=crop",
    author: "Elena Morales",
    date: "2026-01-20",
    category: "Aromaterapia",
    readTime: 6,
  },
];
