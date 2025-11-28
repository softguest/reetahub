import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { properties } from "@/config/schema";
import { z } from "zod";

const CreatePropertySchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  discounted_price: z.coerce.number().optional(),
  telephone: z.coerce.string(), // FIXED
  rent_or_buy: z.enum(["rent", "buy"]),
  city: z.string(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(), // gallery
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const rawData: any = {};

    formData.forEach((value, key) => {
      if (key.startsWith("images")) {
        rawData.images = rawData.images || [];
        rawData.images.push(value.toString());
      } else {
        rawData[key] = value;
      }
    });

    const data = CreatePropertySchema.parse(rawData);

    await db.insert(properties).values({
      title: data.title,
      description: data.description,
      price: data.price,
      discounted_price: data.discounted_price,
      telephone: data.telephone,          // now text
      rent_or_buy: data.rent_or_buy,
      city: data.city,
      thumbnail: data.thumbnail ?? data.images?.[0] ?? null,
      gallery: data.images ?? [],
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
