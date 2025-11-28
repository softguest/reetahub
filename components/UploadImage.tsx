"use client";

import { useState } from "react";

interface UploadImageProps {
  onUploaded: (url: string) => void;
}

export default function UploadImage({ onUploaded }: UploadImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Call your upload API route
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      // Assuming your API returns { url: "https://..." }
      onUploaded(data.url);
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded border"
        />
      )}

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  );
}
