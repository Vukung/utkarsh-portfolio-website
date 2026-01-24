"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

interface EasterEgg {
    id: string;
    name: string;
}

interface ToastData {
    name: string;
    visible: boolean;
}

interface Orb {
    id: string;
    startX: number;
    startY: number;
    variant: "green" | "yellow";
}

interface EasterEggContextType {
    discoveredEggs: Set<string>;
    totalEggs: number;
    triggerEasterEgg: (id: string, name: string) => void;
    toast: ToastData | null;
    clearToast: () => void;
    orbs: Orb[];
    spawnXP: (sourceElement: HTMLElement) => void;
    removeOrb: (id: string) => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

const TOTAL_EASTER_EGGS = 2; // Profile photo + Dark mode warning

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
    const [discoveredEggs, setDiscoveredEggs] = useState<Set<string>>(new Set());
    const [toast, setToast] = useState<ToastData | null>(null);
    const [orbs, setOrbs] = useState<Orb[]>([]);

    const triggerEasterEgg = useCallback((id: string, name: string) => {
        // Only trigger if not already discovered
        if (!discoveredEggs.has(id)) {
            setDiscoveredEggs((prev) => new Set(prev).add(id));

            // Show toast notification
            setToast({ name, visible: true });

            // Auto-dismiss after 5 seconds
            setTimeout(() => {
                setToast((current) => current ? { ...current, visible: false } : null);
            }, 5000);

            // Clear toast completely after animation
            setTimeout(() => {
                setToast(null);
            }, 5500);
        }
    }, [discoveredEggs]);

    const clearToast = useCallback(() => {
        setToast((current) => current ? { ...current, visible: false } : null);
        setTimeout(() => setToast(null), 500);
    }, []);

    const spawnXP = useCallback((sourceElement: HTMLElement) => {
        // Get source position
        const sourceRect = sourceElement.getBoundingClientRect();
        const sourceX = sourceRect.left + sourceRect.width / 2;
        const sourceY = sourceRect.top + sourceRect.height / 2;

        // Spawn 5-8 orbs
        const orbCount = 5 + Math.floor(Math.random() * 4);
        const newOrbs: Orb[] = [];

        for (let i = 0; i < orbCount; i++) {
            newOrbs.push({
                id: `orb-${Date.now()}-${i}`,
                startX: sourceX,
                startY: sourceY,
                variant: Math.random() > 0.5 ? "green" : "yellow",
            });
        }

        setOrbs((prev) => [...prev, ...newOrbs]);
    }, []);

    const removeOrb = useCallback((id: string) => {
        setOrbs((prev) => prev.filter((orb) => orb.id !== id));
    }, []);

    return (
        <EasterEggContext.Provider
            value={{
                discoveredEggs,
                totalEggs: TOTAL_EASTER_EGGS,
                triggerEasterEgg,
                toast,
                clearToast,
                orbs,
                spawnXP,
                removeOrb,
            }}
        >
            {children}
        </EasterEggContext.Provider>
    );
}

export function useEasterEgg() {
    const context = useContext(EasterEggContext);
    if (context === undefined) {
        throw new Error("useEasterEgg must be used within an EasterEggProvider");
    }
    return context;
}
