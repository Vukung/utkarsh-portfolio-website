"use client";

import { useEasterEgg } from "@/contexts/easter-egg-context";
import { XPOrb } from "./xp-orb";

export function XPManager() {
    const { orbs, removeOrb } = useEasterEgg();

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
            {orbs.map((orb, index) => (
                <XPOrb
                    key={orb.id}
                    id={orb.id}
                    startX={orb.startX}
                    startY={orb.startY}
                    variant={orb.variant}
                    index={index}
                    onCollect={removeOrb}
                />
            ))}
        </div>
    );
}
