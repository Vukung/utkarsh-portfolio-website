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

interface EasterEggContextType {
    discoveredEggs: Set<string>;
    totalEggs: number;
    triggerEasterEgg: (id: string, name: string) => void;
    toast: ToastData | null;
    clearToast: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

const TOTAL_EASTER_EGGS = 2; // Profile photo + Dark mode warning

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
    const [discoveredEggs, setDiscoveredEggs] = useState<Set<string>>(new Set());
    const [toast, setToast] = useState<ToastData | null>(null);

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

    return (
        <EasterEggContext.Provider
            value={{
                discoveredEggs,
                totalEggs: TOTAL_EASTER_EGGS,
                triggerEasterEgg,
                toast,
                clearToast,
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
