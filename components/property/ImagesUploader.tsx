"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  onChange: (images: string[]) => void;
}

export default function ImagesUploader({ onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      const upload = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: form,
        }
      );

      const res = await upload.json();
      newUrls.push(res.secure_url);
    }

    const updated = [...images, ...newUrls];
    setImages(updated);
    onChange(updated);
    setUploading(false);
  }

  function deleteImage(url: string) {
    const updated = images.filter(img => img !== url);
    setImages(updated);
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {/* File Input */}
      <label className="block w-full p-4 border border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-100 transition">
        <p className="text-center text-gray-600">Click to upload multiple images</p>
        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleUpload}
        />
      </label>

      {uploading && <p className="text-sm text-blue-500">Uploading…</p>}

      {/* Preview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url) => (
          <div key={url} className="relative group">
            <Image
              src={url}
              width={200}
              height={150}
              alt="Preview"
              className="object-cover rounded-xl w-full h-32 shadow"
            />

            {/* Delete Button */}
            <button
              onClick={() => deleteImage(url)}
              className="absolute top-1 right-1 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
