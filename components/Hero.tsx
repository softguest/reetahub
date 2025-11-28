// ==========================
// COMPONENT: HERO (FUTURISTIC, PARALLAX READY)
// ==========================
"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export const Hero = () => {
  const { scrollY } = useScroll();
  const translateYBg = useTransform(scrollY, [0, 300], [0, 150]);
  const translateYCards = useTransform(scrollY, [0, 300], [0, -50]);

  const propertyCards = [
    { title: "Skyline Penthouse", price: "$1.2M", img: "/property1.jpg" },
    { title: "Futuristic Villa", price: "$850K", img: "/property2.jpg" },
    { title: "Urban Loft", price: "$600K", img: "/property3.jpg" },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Cinematic Background Video */}
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        style={{ y: translateYBg }}
        className="absolute w-full h-full object-cover opacity-70"
        src="/hero-video.mp4"
      />

      {/* Neon Overlay Gradient */}
      <div className="absolute w-full h-full bg-gradient-to-b from-[#0ff] via-transparent to-black opacity-40 mix-blend-screen" />

      {/* Floating Property Cards */}
      <motion.div
        style={{ y: translateYCards }}
        className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex space-x-6 z-20"
      >
        {propertyCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
            className="bg-black/80 backdrop-blur-md rounded-2xl overflow-hidden w-64 shadow-xl border border-cyan-400/50 hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-white">
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-cyan-400 font-semibold mt-1">{card.price}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Hero Text & CTA */}
      <div className="flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-wide drop-shadow-lg pt-20"
        >
          Real Estate Agency.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-lg md:text-2xl max-w-3xl text-white/90"
        >
          Explore affordable real estate properties in the city. Buy, Sell, and Rent with confidence.
        </motion.p>
      </div>
      <div className="z-30 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 flex space-x-6"
        >
          <button className="px-6 py-3 bg-cyan-400/90 hover:bg-cyan-500 text-black font-bold rounded-lg uppercase tracking-wider shadow-lg transition-all">
            Buy
          </button>
          <button className="px-6 py-3 bg-black/70 hover:bg-black/80 border border-cyan-400 text-cyan-400 font-bold rounded-lg uppercase tracking-wider shadow-lg transition-all">
            Rent
          </button>
          <button className="px-6 py-3 bg-black/50 hover:bg-black/60 text-white font-bold rounded-lg uppercase tracking-wider shadow-lg transition-all">
            Explore Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
};
