"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.header
            className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-colors ${isScrolled
                    ? "bg-background/80 border-border"
                    : "bg-transparent border-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <nav className="container max-w-3xl mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>

                <ThemeToggle />
            </nav>
        </motion.header>
    );
}
