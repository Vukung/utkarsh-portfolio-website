"use client";

import { EasterEggCounter } from "@/components/easter-egg-counter";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Achievements", href: "#achievements" },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [mobileMenuOpen]);

    const scrollToSection = (href: string) => {
        setMobileMenuOpen(false); // Close mobile menu if open
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.header
            className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-colors ${isScrolled || mobileMenuOpen
                ? "bg-background/80 border-border"
                : "bg-transparent border-transparent"
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <nav className="container mx-auto flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-6">
                    {/* Desktop Links */}
                    {navLinks.map((link) => (
                        <button
                            key={link.href}
                            onClick={() => scrollToSection(link.href)}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:inline-block"
                        >
                            {link.label}
                        </button>
                    ))}

                    {/* Mobile Menu Trigger */}
                    <button
                        className="md:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? null : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <EasterEggCounter />
                    <ThemeToggle />
                    {/* Close button for mobile menu (positioned here or inside overlay, let's keep trigger simple) */}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md md:hidden border-t"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(link.href)}
                                    className="text-2xl font-bold text-left text-foreground/80 hover:text-foreground"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
