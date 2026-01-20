"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProfilePhoto({ className }: { className?: string }) {
    const [showGlasses, setShowGlasses] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    const handleHoverStart = () => {
        if (!isMobile) {
            setIsHovering(true);
            setAnimationKey((prev) => prev + 1);
        }
    };

    const handleHoverEnd = () => {
        if (!isMobile) {
            setIsHovering(false);
            // Photo state persists - does not revert
        }
    };

    const handleClick = () => {
        if (isMobile) {
            setShowGlasses((prev) => !prev);
        }
    };

    // When animation completes, toggle the photo
    const handleAnimationComplete = () => {
        if (isHovering) {
            setShowGlasses((prev) => !prev);
        }
    };

    const circumference = 2 * Math.PI * 62; // radius = 62
    const animationDuration = 0.5; // seconds - matches photo transition - cancelled - now instant transition

    return (
        <div className={`relative mx-auto md:mx-0 ${className || "w-32 h-32"}`}>
            {/* Animated loading ring - only visible on hover */}
            <svg
                className="absolute inset-0 w-full h-full -rotate-90"
                viewBox="0 0 132 132"
            >
                {/* Background circle - always visible */}
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
                {isHovering && (
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

            {/* Profile image with Easter egg - hover on desktop, click on mobile */}
            <div
                className="absolute inset-2 rounded-full overflow-hidden cursor-pointer"
                onClick={handleClick}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
            >
                {/* Normal photo */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: showGlasses ? 0 : 1 }}
                    transition={{ duration: 0 }}
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
                    transition={{ duration: 0 }}
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
