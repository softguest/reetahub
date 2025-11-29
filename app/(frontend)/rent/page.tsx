import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { Footer } from "@/components/Footer";
import { eq } from "drizzle-orm";

import { db } from "@/config/db";
import { properties } from "@/config/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function BuyPage() {
  // Fetch first 6 properties
const data = await db
  .select()
  .from(properties)
  .where(eq(properties.rent_or_buy, "rent")) // only buy properties
  .orderBy(desc(properties.created_at))

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
     <section className="max-w-7xl mx-auto mt-20 px-6 grid md:grid-cols-3 gap-8">
        {data.map((p) => (
          <Link
            key={p.id}
            href={`/properties/${p.id}`}
            className="block" // ensures it behaves like a block element
          >
            <PropertyCard
              title={p.title}
              price={p.price.toString()}
              location={p.city}
              img={p.thumbnail || "/placeholder.jpg"}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
