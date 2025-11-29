// Hero.tsx (server component)
import { db } from "@/config/db";
import { properties } from "@/config/schema";
import { desc } from "drizzle-orm";
import { FloatingPropertyCards } from "./FloatingPropertyCards"; // client component

export const Hero = async () => {
  // Fetch first 6 properties
  const propertyCards = await db
    .select()
    .from(properties)
    .orderBy(desc(properties.created_at))
    .limit(3);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-70"
        src="/hero-video.mp4"
      />

      {/* Overlay */}
      <div className="absolute w-full h-full bg-gradient-to-b from-[#0ff] via-transparent to-black opacity-40 mix-blend-screen" />

      <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center tracking-wide drop-shadow-lg mt-6">
        Real Estate Agency.
      </h1>
      <p className="text-lg md:text-3xl font-extrabold text-white text-center tracking-wide drop-shadow-lg mt-6 text-white/90">
        Explore affordable real estate properties in the city.<br />
        Buy, Sell, and Rent with confidence.
      </p>

      {/* Client-side animated cards */}
      <FloatingPropertyCards propertyCards={propertyCards} />

      {/* CTA buttons */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-6 pt-[65vh]">
        <div className="flex space-x-6">
          <button className="px-6 py-3 bg-cyan-400/90 hover:bg-cyan-500 text-black font-bold rounded-lg uppercase tracking-wider shadow-lg transition-all">
            Buy
          </button>
          <button className="px-6 py-3 bg-black/70 hover:bg-black/80 border border-cyan-400 text-cyan-400 font-bold rounded-lg uppercase tracking-wider shadow-lg transition-all">
            Rent
          </button>
          <button className="px-6 py-3 bg-black/50 hover:bg-black/60 text-white font-bold rounded-lg uppercase tracking-wider shadow-lg transition-all">
            Explore Projects
          </button>
        </div>
      </div>
    </section>
  );
};
