"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/rent", label: "Rent" },
    { href: "/buy", label: "Buy" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <h1 className="text-xl font-bold text-white">Reetahub</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition ${
                pathname === link.href
                  ? "text-blue-400 font-semibold"
                  : "hover:text-gray-300"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <div className="">
              {/* <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Sign Up
                </Button>
              </Link> */}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <UserButton />

              <Link href="/dashboard">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/40 backdrop-blur-lg border-t border-white/10 p-4 space-y-4 animate-in slide-in-from-top text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 ${
                pathname === link.href
                  ? "text-blue-400 font-semibold"
                  : "hover:text-gray-300"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!user ? (
            <div className="">
              {/* <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-black"
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Sign Up
                </Button>
              </Link> */}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <UserButton />
              <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-white text-black hover:bg-gray-200">
                  Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
};
