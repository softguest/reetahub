import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PropertyCard } from "@/components/PropertyCard";
import { Footer } from "@/components/Footer";

import { db } from "@/config/db";
import { properties } from "@/config/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function HomePage() {
  // Fetch first 6 properties
  const data = await db
    .select()
    .from(properties)
    .orderBy(desc(properties.created_at))
    .limit(6);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Hero />
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
