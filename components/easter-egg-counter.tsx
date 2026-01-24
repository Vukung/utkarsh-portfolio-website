"use client";

import { Badge } from "@/components/ui/badge";
import { useEasterEgg } from "@/contexts/easter-egg-context";
import { celebrateCompletion } from "@/lib/confetti";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect } from "react";

export function EasterEggCounter() {
    const { discoveredEggs, totalEggs } = useEasterEgg();
    const count = discoveredEggs.size;
    const isComplete = count === totalEggs;
    const hasProgress = count > 0 && count < totalEggs;

    // Trigger confetti on completion
    useEffect(() => {
        if (isComplete && count > 0) {
            celebrateCompletion();
        }
    }, [isComplete, count]);

    return (
        <motion.div
            id="easter-egg-counter"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
        >
            {isComplete ? (
                // Completion state - Gold with sparkle
                <Badge
                    variant="outline"
                    className="relative overflow-visible bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600 border-yellow-500 dark:border-amber-500 text-yellow-950 dark:text-yellow-950 font-semibold shadow-lg shadow-yellow-500/30"
                >
                    <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                    {count}/{totalEggs} Secrets
                    <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </Badge>
            ) : hasProgress ? (
                // Progress state - Normal badge
                <Badge
                    variant="secondary"
                    className="font-medium"
                >
                    {count}/{totalEggs} Secrets
                </Badge>
            ) : (
                // Initial state - Muted
                <Badge
                    variant="outline"
                    className="text-muted-foreground font-normal"
                >
                    {count}/{totalEggs} Secrets
                </Badge>
            )}
        </motion.div>
    );
}
