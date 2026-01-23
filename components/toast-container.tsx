"use client";

import { Toast } from "@/components/ui/toast";
import { useEasterEgg } from "@/contexts/easter-egg-context";

export function ToastContainer() {
    const { toast } = useEasterEgg();

    if (!toast) return null;

    return <Toast message={toast.name} visible={toast.visible} />;
}
