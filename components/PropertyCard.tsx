// ==========================
// COMPONENT: PROPERTY CARD
// ==========================
"use client";
import { motion } from "framer-motion";

export const PropertyCard = ({ title, price, img, location }: { title: string; price: number | string; img: string; location: string }) => {
return (
<motion.div
whileHover={{ scale: 1.03 }}
className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl transition p-4"
>
<img src={img} className="h-48 w-full object-cover rounded-xl" />
<div className="mt-3 text-white">
<h3 className="text-xl font-semibold">{title}</h3>
<p className="text-sm opacity-70">{location}</p>
<p className="text-lg font-bold mt-2">${price}</p>
</div>
</motion.div>
);
};