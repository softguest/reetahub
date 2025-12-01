"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadGallery from "@/components/UploadGallery";

export default function Dashboard() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData(e.currentTarget);

      // Append Cloudinary URLs
      images.forEach((url, index) => {
        form.append(`images[${index}]`, url);
      });

      if (images.length > 0) {
        form.append("thumbnail", images[0]);
      }

      const res = await fetch("/api/properties", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error("Error creating property");
      }

      // Redirect to homepage after successful creation
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error creating property. Check console for details.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Property</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <UploadGallery onUploaded={(urls) => setImages(urls)} />

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full h-32 object-cover rounded-lg border"
              />
            ))}
          </div>
        )}

        <input
          name="title"
          placeholder="Property Title"
          className="border p-2 w-full rounded"
          required
          disabled={loading}
        />
        <textarea
          name="description"
          placeholder="Description"
          rows={4}
          className="border p-2 w-full rounded"
          required
          disabled={loading}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 w-full rounded"
          required
          disabled={loading}
        />
        <input
          name="discounted_price"
          type="number"
          placeholder="Discounted Price"
          className="border p-2 w-full rounded"
          disabled={loading}
        />
        <input
          name="telephone"
          type="number"
          placeholder="Telephone"
          className="border p-2 w-full rounded"
          required
          disabled={loading}
        />
        <select
          name="rent_or_buy"
          className="border p-2 w-full rounded"
          disabled={loading}
        >
          <option value="rent">Rent</option>
          <option value="buy">Buy</option>
        </select>
        <input
          name="city"
          placeholder="City"
          className="border p-2 w-full rounded"
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="relative bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                />
              </svg>
            </span>
          )}
          {loading ? "Creating..." : "Create Property"}
        </button>
      </form>
    </div>
  );
}
