"use client";
import { motion, useScroll, useTransform } from "framer-motion";

interface Property {
  id: number; // was string, now number
  title: string;
  price: number;
  thumbnail?: string | null;
}

interface Props {
  propertyCards: Property[];
}

export const FloatingPropertyCards = ({ propertyCards }: Props) => {
  const { scrollY } = useScroll();
  const translateYCards = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <motion.div
      style={{ y: translateYCards }}
      className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20"
    >
      {propertyCards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
          className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden w-64 shadow-xl border border-cyan-400/50 hover:scale-105 transition-transform cursor-pointer"
        >
          <img
            src={card.thumbnail || "/placeholder.jpg"}
            alt={card.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 text-white">
            <h3 className="text-xl font-bold">{card.title}</h3>
            <p className="text-cyan-400 font-semibold mt-1">${card.price.toLocaleString()}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
