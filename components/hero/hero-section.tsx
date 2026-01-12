"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { LocationWidget } from "./location-widget";
import { ProfilePhoto } from "./profile-photo";
import { SocialLinks } from "./social-links";

export function HeroSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <ProfilePhoto />
                </motion.div>

                {/* Bio and Info */}
                <div className="flex-1 text-center md:text-left">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {personalInfo.name}
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-xl text-muted-foreground mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {personalInfo.role}
                    </motion.p>

                    <motion.p
                        className="text-base text-muted-foreground mb-6 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        {personalInfo.bio}
                    </motion.p>

                    <SocialLinks />

                    <LocationWidget />
                </div>
            </div>
        </section>
    );
}
