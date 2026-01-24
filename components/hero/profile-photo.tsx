"use client";

import { useEasterEgg } from "@/contexts/easter-egg-context";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProfilePhoto({ className }: { className?: string }) {
    const [showGlasses, setShowGlasses] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isRevealed, setIsRevealed] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const { triggerEasterEgg, spawnXP, discoveredEggs } = useEasterEgg();
    const photoRef = useRef<HTMLDivElement>(null);

    const isCollected = discoveredEggs.has("cool-shades");

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleHoverStart = () => {
        if (!isMobile) {
            setIsHovering(true);
            setAnimationKey(prev => prev + 1);
            // Don't show glasses immediately - wait for animation
        }
    };

    const handleHoverEnd = () => {
        if (!isMobile) {
            setIsHovering(false);
            // Only hide glasses if not yet revealed
            if (!isRevealed) {
                setShowGlasses(false);
            }
        }
    };

    const handleAnimationComplete = () => {
        // Only switch state if we are still hovering
        if (isHovering) {
            setShowGlasses(prev => !prev);
            setIsRevealed(true);
        }
    };

    const handleClick = () => {
        if (isMobile) {
            // Mobile toggle behavior
            setShowGlasses(prev => !prev);
            if (!showGlasses) {
                setIsRevealed(true);
            }

            // Check for collection on mobile click if showing glasses
            if (!showGlasses && !isCollected && photoRef.current) {
                triggerEasterEgg("cool-shades", "Cool Shades");
                spawnXP(photoRef.current);
            }
        } else {
            // Desktop click collection
            // Allow collection if revealed
            if (isRevealed && !isCollected && photoRef.current) {
                triggerEasterEgg("cool-shades", "Cool Shades");
                spawnXP(photoRef.current);
            }
        }
    };

    const circumference = 2 * Math.PI * 62; // radius = 62
    const animationDuration = 0.5;

    return (
        <div ref={photoRef} className={`relative mx-auto md:mx-0 ${className || "w-32 h-32"}`}>
            {/* Click to Collect Label - Only visible if not collected and revealed */}
            <AnimatePresence>
                {!isCollected && ((!isMobile && isRevealed) || (isMobile && showGlasses)) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap pointer-events-none"
                    >
                        <div
                            className="px-3 py-1 bg-black/80 border border-white text-white text-sm rounded pixelated animate-pulse"
                            style={{ fontFamily: "'VT323', monospace" }}
                        >
                            [Click to Collect XP]
                        </div>
                        {/* Pixel arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/80 border-r border-b border-white rotate-45 transform" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Circular Loading Animation - Restored */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10"
                viewBox="0 0 132 132"
            >
                {/* Background circle */}
                <circle
                    cx="66"
                    cy="66"
                    r="62"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className="text-muted-foreground/20"
                />

                {/* Animated progress circle - only on hover */}
                {!isMobile && isHovering && (
                    <motion.circle
                        key={animationKey}
                        cx="66"
                        cy="66"
                        r="62"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        className="text-blue-500 dark:text-blue-400"
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{
                            duration: animationDuration,
                            ease: "linear"
                        }}
                        onAnimationComplete={handleAnimationComplete}
                        style={{
                            strokeDasharray: circumference,
                        }}
                    />
                )}
            </svg>

            {/* Profile image container */}
            <div
                className={`absolute inset-2 rounded-full overflow-hidden ${!isCollected ? 'cursor-pointer' : ''}`}
                onClick={handleClick}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
            >
                {/* Normal photo */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: showGlasses ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src="/profile1.jpg"
                        alt="Utkarsh Shirbhate"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Glasses variant */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: showGlasses ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Image
                        src="/profile-glasses1.jpg"
                        alt="Utkarsh Shirbhate with glasses"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </div>
    );
}
