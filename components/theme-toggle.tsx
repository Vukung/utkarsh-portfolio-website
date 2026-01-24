"use client";

import { Button } from "@/components/ui/button";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showToldYa, setShowToldYa] = useState(false);
    const [flash, setFlash] = useState(false);
    const { triggerEasterEgg, spawnXP, discoveredEggs } = useEasterEgg();
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        if (theme === "dark") {
            setShowWarning(true);
            return;
        }

        if (theme === "light") {
            // Switching back to dark mode
            setShowToldYa(true);
            setTimeout(() => setShowToldYa(false), 2000);
        }

        setTheme(theme === "dark" ? "light" : "dark");
    };

    const confirmSwitch = () => {
        setShowWarning(false);
        setFlash(true);
        setTimeout(() => {
            setTheme("light");
            setFlash(false);
        }, 300); // Short delay for the flash to be visible before theme switch if needed, or just simultaneous
    };

    const cancelSwitch = () => {
        setShowWarning(false);
        // Trigger Easter egg when user refuses to switch to light mode (only if not already discovered)
        if (buttonRef.current && !discoveredEggs.has("dark-mode-warning")) {
            triggerEasterEgg("dark-mode-warning", "Flashbang Survivor");
            spawnXP(buttonRef.current);
        }
    };

    if (!mounted) {
        return <Button variant="ghost" size="icon" className="w-9 h-9" />;
    }

    return (
        <div className="relative">
            {/* Flash Effect */}
            <AnimatePresence>
                {flash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-white pointer-events-none"
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <Button
                ref={buttonRef}
                variant="ghost"
                size="icon"
                onClick={handleThemeToggle}
                className="w-9 h-9"
            >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Warning Popup */}
            <AnimatePresence>
                {showWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        className="absolute right-0 top-12 z-50 w-64 p-4 rounded-lg border bg-popover text-popover-foreground shadow-lg"
                    >
                        <div className="space-y-3">
                            <h4 className="font-medium leading-none">Are you sure?</h4>
                            <p className="text-sm text-muted-foreground">
                                Flashbang incoming! Are you sure you want to switch to light mode?
                            </p>
                            <div className="flex justify-end gap-2">
                                <Button variant="default" size="sm" onClick={cancelSwitch}>
                                    No
                                </Button>
                                <Button variant="outline" size="sm" onClick={confirmSwitch}>
                                    Yes
                                </Button>
                            </div>
                        </div>
                        {/* Arrow */}
                        <div className="absolute -top-2 right-3 w-4 h-4 bg-popover border-l border-t rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Told Ya Popup */}
            <AnimatePresence>
                {showToldYa && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="absolute right-0 top-12 z-50 p-3 rounded-lg border bg-popover text-popover-foreground shadow-lg whitespace-nowrap"
                    >
                        <p className="font-medium text-sm">Told ya! 🌚</p>
                        {/* Arrow */}
                        <div className="absolute -top-1 right-3 w-2 h-2 bg-popover border-l border-t rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
