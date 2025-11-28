"use client";

import { useState } from "react";
import UploadGallery from "@/components/UploadGallery";

export default function NewPropertyPage() {
  const [images, setImages] = useState<string[]>([]);

  async function handleSubmit(e: any) {
    e.preventDefault();

    const form = new FormData(e.target);

    // Append Cloudinary URLs
    images.forEach((url, index) => {
      form.append(`images[${index}]`, url);
    });

    if (images.length > 0) {
      form.append("thumbnail", images[0]); // first image as thumbnail
    }

    const res = await fetch("/api/properties", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      alert("Error creating property");
      return;
    }

    alert("Property created successfully!");
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <UploadGallery onUploaded={(urls) => setImages(urls)} />

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((src, i) => (
              <img key={i} src={src} className="w-full h-32 object-cover rounded-lg border" />
            ))}
          </div>
        )}

        <input name="title" placeholder="Property Title" className="border p-2 w-full rounded" required />
        <textarea name="description" placeholder="Description" rows={4} className="border p-2 w-full rounded" required />
        <input name="price" type="number" placeholder="Price" className="border p-2 w-full rounded" required />
        <input name="discounted_price" type="number" placeholder="Discounted Price" className="border p-2 w-full rounded" />
        <input name="telephone" type="number" placeholder="Telephone" className="border p-2 w-full rounded" required />
        <select name="rent_or_buy" className="border p-2 w-full rounded">
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>
        <input name="city" placeholder="City" className="border p-2 w-full rounded" required />

        <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
          Create Property
        </button>
      </form>
    </div>
  );
}
