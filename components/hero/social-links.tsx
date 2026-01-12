"use client";

import { Button } from "@/components/ui/button";
import { personalInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { FileDown, Github, Linkedin } from "lucide-react";

const socialLinks = [
    {
        icon: Github,
        href: personalInfo.social.github,
        label: "GitHub",
    },
    {
        icon: Linkedin,
        href: personalInfo.social.linkedin,
        label: "LinkedIn",
    },
    {
        icon: FileDown,
        href: personalInfo.social.resume,
        label: "Resume",
        download: true,
    },
];

export function SocialLinks() {
    return (
        <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
        >
            {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                    <motion.div
                        key={link.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                    >
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="gap-2"
                        >
                            <a
                                href={link.href}
                                target={link.download ? undefined : "_blank"}
                                rel={link.download ? undefined : "noopener noreferrer"}
                                download={link.download}
                            >
                                <Icon className="w-4 h-4" />
                                {link.label}
                            </a>
                        </Button>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
