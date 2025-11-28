"use client";

import { useState } from "react";

export default function UploadGallery({ onUploaded }: { onUploaded: (urls: string[]) => void }) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  function handleFiles(event: any) {
    const files = Array.from(event.target.files as FileList);
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  async function uploadAll() {
    setUploading(true);
    const urls: string[] = [];

    for (const file of images) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) urls.push(data.secure_url);
    }

    setUploading(false);
    onUploaded(urls);
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-400 p-8 rounded-lg text-center cursor-pointer">
        <p className="text-gray-600 mb-2">Upload Property Images</p>
        <input type="file" multiple onChange={handleFiles} />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previews.map((src, index) => (
            <div key={index} className="relative">
              <img src={src} className="w-full h-32 object-cover rounded-lg border" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={uploadAll}
        disabled={images.length === 0 || uploading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
}
