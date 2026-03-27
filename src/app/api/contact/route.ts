import { ok, err, handleZodError } from "@/lib/api-helpers";
import { contactSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    contactSchema.parse(body);
    // No DB write — contact form only; could send email here in the future
    return ok({ success: true });
  } catch (e) {
    if (e instanceof ZodError) return handleZodError(e);
    return err("Internal server error", 500);
  }
}
