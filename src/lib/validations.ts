import { z } from "zod";

export const serviceCreateSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  shortDescription: z.string().default(""),
  icon: z.string().default(""),
  category: z.enum(["MASAJES", "FACIALES", "CORPORALES", "NAIL_SPA", "AROMATERAPIA", "MAQUILLAJE"]),
  price: z.number().positive(),
  duration: z.number().int().positive(),
  image: z.string().optional(),
  benefits: z.array(z.string()).default([]),
  isPopular: z.boolean().default(false),
});

export const serviceUpdateSchema = serviceCreateSchema.partial();

export const therapistCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  bio: z.string().optional(),
  specialty: z.array(z.string()).default([]),
  avatar: z.string().optional(),
  experience: z.number().int().nonnegative(),
});

export const therapistUpdateSchema = therapistCreateSchema.partial();

export const bookingCreateSchema = z.object({
  serviceSlug: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.string().min(1),
  therapistId: z.string().default(""),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  notes: z.string().optional(),
});

export const bookingStatusSchema = z.object({
  status: z.enum(["PENDIENTE", "CONFIRMADA", "COMPLETADA", "CANCELADA"]),
});

export const userCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(["CLIENTE", "TERAPEUTA", "ADMIN"]).default("CLIENTE"),
});

export const userUpdateSchema = userCreateSchema.partial().extend({
  password: z.string().min(6).optional(),
});

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const paymentCreateSchema = z.object({
  appointmentId: z.string().min(1),
  amount: z.number().positive(),
  method: z.enum(["STRIPE", "MANUAL"]).default("MANUAL"),
  status: z.enum(["PENDIENTE", "PAGADO", "REEMBOLSADO"]).default("PAGADO"),
});

export const paymentUpdateSchema = z.object({
  status: z.enum(["PENDIENTE", "PAGADO", "REEMBOLSADO"]),
  method: z.enum(["STRIPE", "MANUAL"]).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});
