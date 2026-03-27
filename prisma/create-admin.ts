import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const db = new PrismaClient({ adapter });

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);
  const user = await db.user.upsert({
    where: { email: "admin@ariday.com" },
    update: { password: hashed, role: "ADMIN" },
    create: { email: "admin@ariday.com", name: "Admin Ariday", password: hashed, role: "ADMIN" },
  });
  console.log("Admin created:", user.email, user.role);
}

main().catch(console.error).finally(() => db.$disconnect());
