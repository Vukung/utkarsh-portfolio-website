"use client";

import { Badge } from "@/components/ui/badge";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Languages",
        skills: skills.languages,
        colorClasses: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
        title: "Frameworks",
        skills: skills.frameworks,
        colorClasses: "bg-green-500/20 text-green-400 border-green-500/30",
    },
    {
        title: "Backend",
        skills: skills.backend,
        colorClasses: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    },
    {
        title: "Databases",
        skills: skills.databases,
        colorClasses: "bg-red-500/20 text-red-400 border-red-500/30",
    },
    {
        title: "Practices",
        skills: skills.practices,
        colorClasses: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    },
];

export function SkillsSection() {
    return (
        <section className="pt-2 pb-6">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Skills
            </motion.h2>

            <div className="space-y-6">
                {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: categoryIndex * 0.1 }}
                    >
                        <h3 className="text-lg font-semibold mb-3 text-muted-foreground">
                            {category.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                                >
                                    <Badge
                                        variant="outline"
                                        className={`text-sm px-3 py-1 ${category.colorClasses}`}
                                    >
                                        {skill}
                                    </Badge>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
