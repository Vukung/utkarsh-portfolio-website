"use client";

import { motion, useMotionValue } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";

interface XPOrbProps {
    id: string;
    startX: number;
    startY: number;
    variant: "green" | "yellow";
    index: number;
    onCollect: (id: string) => void;
}

export function XPOrb({ id, startX, startY, variant, index, onCollect }: XPOrbProps) {
    const soundOptions = useMemo(() => ({
        volume: 0.4,
        playbackRate: 0.8 + (index * 0.1),
    }), [index]);

    const [playCollect] = useSound("/xp.m4a", soundOptions);
    const [phase, setPhase] = useState<"burst" | "magnet" | "collect">("burst");
    const [currentTargetX, setCurrentTargetX] = useState(0);
    const [currentTargetY, setCurrentTargetY] = useState(0);

    // Calculate mobile-aware burst distance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const burstDistance = isMobile ? 30 + Math.random() * 30 : 50 + Math.random() * 50;

    // Calculate random burst direction and distance
    const burstAngle = Math.random() * Math.PI * 2;
    const burstX = startX + Math.cos(burstAngle) * burstDistance;
    const burstY = startY + Math.sin(burstAngle) * burstDistance;

    // Random rotation for variety
    const rotation = Math.random() * 360;

    // Use motion values for smooth updates
    const x = useMotionValue(startX);
    const y = useMotionValue(startY);

    // Continuously update target position during magnet phase
    useEffect(() => {
        if (phase !== "magnet") return;

        let animationFrameId: number;

        const updateTarget = () => {
            const counter = document.querySelector('#easter-egg-counter');
            if (counter) {
                const rect = counter.getBoundingClientRect();
                const targetX = rect.left + rect.width / 2;
                const targetY = rect.top + rect.height / 2;

                setCurrentTargetX(targetX);
                setCurrentTargetY(targetY);
            }

            animationFrameId = requestAnimationFrame(updateTarget);
        };

        updateTarget();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [phase]);

    // Phase transitions
    useEffect(() => {
        // Phase 1: Burst - lasts 0.5s
        const burstTimer = setTimeout(() => {
            setPhase("magnet");

            // Get initial target position
            const counter = document.querySelector('#easter-egg-counter');
            if (counter) {
                const rect = counter.getBoundingClientRect();
                setCurrentTargetX(rect.left + rect.width / 2);
                setCurrentTargetY(rect.top + rect.height / 2);
            }
        }, 500);

        // Phase 2: Magnet - starts at 0.5s, lasts 1s
        const magnetTimer = setTimeout(() => {
            setPhase("collect");
        }, 1500);

        // Phase 3: Collection - call onCollect after animation
        const collectTimer = setTimeout(() => {
            playCollect();
            onCollect(id);
        }, 1600);

        return () => {
            clearTimeout(burstTimer);
            clearTimeout(magnetTimer);
            clearTimeout(collectTimer);
        };
    }, [id, onCollect]);

    // Determine position based on phase
    const targetX = phase === "burst" ? burstX : currentTargetX;
    const targetY = phase === "burst" ? burstY : currentTargetY;
    const scale = phase === "collect" ? 0 : 1;
    const opacity = phase === "collect" ? 0 : 1;

    return (
        <motion.div
            initial={{
                x: startX,
                y: startY,
                scale: 0,
                opacity: 0,
                rotate: 0,
            }}
            animate={{
                x: targetX,
                y: targetY,
                scale: scale,
                opacity: opacity,
                rotate: rotation,
            }}
            transition={{
                x: {
                    duration: phase === "burst" ? 0.5 : 1,
                    ease: phase === "burst" ? "easeOut" : "easeInOut",
                    type: phase === "burst" ? "spring" : "tween",
                    damping: phase === "burst" ? 15 : undefined,
                },
                y: {
                    duration: phase === "burst" ? 0.5 : 1,
                    ease: phase === "burst" ? "easeOut" : "easeInOut",
                    type: phase === "burst" ? "spring" : "tween",
                    damping: phase === "burst" ? 15 : undefined,
                },
                scale: {
                    duration: phase === "burst" ? 0.3 : 0.2,
                    ease: "easeOut",
                },
                opacity: {
                    duration: phase === "collect" ? 0.2 : 0.3,
                },
                rotate: {
                    duration: 1.5,
                    ease: "linear",
                },
            }}
            style={{
                position: "fixed",
                width: 24,
                height: 24,
                pointerEvents: "none",
                zIndex: 9999,
                left: -12, // Center the orb on its position
                top: -12,
            }}
        >
            <Image
                src={variant === "green" ? "/Minecraft Green orb.png" : "/Minecraft Yellow orb.png"}
                alt={`${variant} XP orb`}
                width={24}
                height={24}
                style={{
                    imageRendering: "pixelated",
                    filter: `drop-shadow(0 0 4px ${variant === "green" ? "#7FFF00" : "#FFD700"})`,
                }}
                unoptimized
            />
        </motion.div>
    );
}
