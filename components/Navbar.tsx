"use client";
import Link from "next/link";
import { motion } from "framer-motion";


export const Navbar = () => {
return (
<motion.nav
initial={{ y: -20, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10"
>
<div className="max-w-7xl mx-auto flex items-center justify-between p-4">
<h1 className="text-xl font-bold text-white">Reetahub</h1>
<div className="space-x-6 text-white hidden md:flex">
<Link href="/">Home</Link>
<Link href="/services">Services</Link>
<Link href="/projects">Projects</Link>
<Link href="/rent">Rent</Link>
<Link href="/buy">Buy</Link>
<Link href="/about">About</Link>
<Link href="/contact">Contact</Link>
</div>
</div>
</motion.nav>
);
};