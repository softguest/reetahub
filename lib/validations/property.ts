import { z } from "zod";

export const CreatePropertySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  price: z.coerce.number().min(0),
  rent_or_buy: z.enum(["rent", "buy"]),
  city: z.string().min(2),
  bedrooms: z.coerce.number().min(0),
  bathrooms: z.coerce.number().min(0),
  sqft: z.coerce.number().min(0),
  thumbnail: z.string().url().optional(),
});
