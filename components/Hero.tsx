// ==========================
// COMPONENT: HERO (PARALLAX READY)
// ==========================
"use client";
import { motion, useScroll, useTransform } from "framer-motion";


export const Hero = () => {
const { scrollY } = useScroll();
const translateY = useTransform(scrollY, [0, 300], [0, 150]);


return (
<section className="relative h-[90vh] w-full overflow-hidden bg-black">
<motion.img
src="/hero-city.jpg"
alt="City"
style={{ y: translateY }}
className="absolute w-full h-full object-cover opacity-60"
/>
<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
<motion.h1
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className="text-5xl md:text-7xl font-bold"
>
Real Estate Transactional Agency
</motion.h1>
<motion.p
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.4 }}
className="mt-4 text-lg md:text-2xl max-w-2xl"
>
Discover Affordable properties with credible value. Buy Sell and Rent.
</motion.p>
</div>
</section>
);
};