"use client";

import { Separator } from "@/components/ui/separator";
import { hobbies, personalInfo } from "@/lib/data";
import { Heart } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 mt-20">
            <Separator className="mb-8" />

            <div className="space-y-6">
                {/* Hobbies */}
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Hobbies:</span> {hobbies.join(" • ")}
                    </p>
                </div>

                {/* Copyright */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <span>© {currentYear} {personalInfo.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        Built with <Heart className="w-3 h-3 fill-red-500 text-red-500" /> using Next.js
                    </span>
                </div>
            </div>
        </footer>
    );
}
