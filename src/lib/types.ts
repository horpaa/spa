export interface ApiService {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  category: string;
  price: number;
  duration: number;
  image: string | null;
  benefits: string[];
  isPopular: boolean;
  isActive: boolean;
}

export interface ApiTherapist {
  id: string;
  userId: string;
  name: string;
  email: string;
  bio: string | null;
  specialty: string[];
  avatar: string | null;
  experience: number;
}

export interface CreateBookingPayload {
  serviceSlug: string;
  date: string;
  timeSlot: string;
  therapistId: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
