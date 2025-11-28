"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryModal({ images }: { images: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  // Open modal at selected image
  const openModal = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  // Close modal
  const closeModal = () => setIsOpen(false);

  // Navigation
  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  // Keyboard support
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  return (
    <>
      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image src={img} alt={`IMG-${index}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] bg-black/70 flex items-center justify-center pointer-events-auto">
            <div className="relative w-full max-w-5xl m-4 md:m-8 bg-black rounded-xl">

            {/* Close Button */}
            <button
                className="absolute top-3 right-3 bg-black/60 hover:bg-black p-2 rounded-full z-20 pointer-events-auto"
                onClick={closeModal}
            >
                <X className="text-white" size={26} />
            </button>

            {/* Prev Button */}
            <button
                className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/60 hover:bg-black p-2 rounded-full z-20 pointer-events-auto"
                onClick={prevImage}
            >
                <ChevronLeft className="text-white" size={36} />
            </button>

            {/* Next Button */}
            <button
                className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/60 hover:bg-black p-2 rounded-full z-20 pointer-events-auto"
                onClick={nextImage}
            >
                <ChevronRight className="text-white" size={36} />
            </button>

            {/* ACTIVE IMAGE */}
            <div className="relative w-full h-[70vh] flex items-center justify-center z-10 pointer-events-none">
                <Image
                src={images[current]}
                alt={`Gallery-${current}`}
                fill
                className="object-contain pointer-events-none"
                />
            </div>
            </div>
        </div>
        )}
    </>
  );
}
