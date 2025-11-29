import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 drop-shadow-lg">
          Get in Touch
        </h1>
        <p className="text-lg md:text-2xl text-white/90">
          We would love to hear from you. Reach out to us anytime!
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-6">
          <div className="flex items-center gap-4 bg-gray-900/70 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <FaPhoneAlt className="text-cyan-400 text-2xl" />
            <span className="text-xl md:text-2xl">+237 6 94 12 78 02</span>
          </div>

          <div className="flex items-center gap-4 bg-gray-900/70 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
            <FaEnvelope className="text-cyan-400 text-2xl" />
            <span className="text-xl md:text-2xl">info@reetahub.gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
