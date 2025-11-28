import Image from "next/image";
import { db } from "@/config/db";
import { properties } from "@/config/schema";
import { eq } from "drizzle-orm";
import GalleryModal from "./GalleryModal";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const property = await db
    .select()
    .from(properties)
    //@ts-ignore
    .where(eq(properties.id, id))
    .limit(1)
    .then((res) => res[0]);

  if (!property) return <p className="p-10 text-center">Property not found</p>;

  return (
    <div className="min-h-screen bg-transparent text-gray-900">
      {/* Hero Section */}
      {property.thumbnail && (
        <div className="relative w-full h-[400px]">
          <Image
            src={property.thumbnail}
            alt={property.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Title + Location */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl text-white font-semibold">{property.title}</h1>
            <p className="text-lg text-gray-200">{property.city}</p>
          </div>
          <div className="text-right">
            {property.discounted_price ? (
              <div>
                <span className="text-3xl font-bold text-red-500">
                  ${property.discounted_price}
                </span>
                <span className="ml-2 line-through text-gray-400">
                  ${property.price}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${property.price}</span>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {property.rent_or_buy === "rent" ? "Per month" : "For sale"}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-white leading-relaxed mb-8">{property.description}</p>

        {/* Gallery */}
        {Array.isArray(property.gallery) && property.gallery.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <GalleryModal images={property.gallery} />
          </div>
        )}



        {/* Metadata */}
        <div className="mt-10 text-sm text-gray-500">
          <p>Listed on: {new Date(property.created_at!).toLocaleDateString()}</p>
          <p>Last updated: {new Date(property.updated_at!).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
