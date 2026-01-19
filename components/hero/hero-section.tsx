"use client";

import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { LocationWidget } from "./location-widget";
import { ProfilePhoto } from "./profile-photo";
import { SocialLinks } from "./social-links";

export function HeroSection() {
    return (
        <section className="pt-12 md:pt-20 pb-4">
            {/* Map Widget - Full Width at Top */}
            <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <LocationWidget />
            </motion.div>

            {/* Profile Photo + Bio Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Profile Photo - Left */}
                <motion.div
                    className="flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <ProfilePhoto />
                </motion.div>

                {/* Bio Content - Right */}
                <div className="flex-1">
                    {/* Greeting */}
                    <motion.h1
                        className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Hey, I'm {personalInfo.name.split(' ')[0]} 👋
                    </motion.h1>

                    {/* Status indicator */}
                    <motion.div
                        className="flex items-center gap-2 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">Available for work</span>
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        className="text-base text-muted-foreground mb-6 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {personalInfo.bio}
                    </motion.p>

                    {/* Social Links */}
                    <SocialLinks />
                </div>
            </div>
        </section>
    );
}
