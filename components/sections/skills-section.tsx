"use client";

import { skills } from "@/lib/data";
import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Languages",
        skills: skills.languages,
        colorClasses: "badge-blue",
    },
    {
        title: "Frameworks",
        skills: skills.frameworks,
        colorClasses: "badge-green",
    },
    {
        title: "Backend",
        skills: skills.backend,
        colorClasses: "badge-purple",
    },
    {
        title: "Databases",
        skills: skills.databases,
        colorClasses: "badge-red",
    },
    {
        title: "Cloud & Deployment",
        skills: skills.cloud,
        colorClasses: "badge-blue",
    },
    {
        title: "Data & ML (Applied / Exploratory)",
        skills: skills.dataML,
        colorClasses: "badge-purple",
    },
    {
        title: "Practices",
        skills: skills.practices,
        colorClasses: "badge-yellow",
    },
];

export function SkillsSection() {
    return (
        <section className="pb-4 pt-1">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-4"
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
                                    <span
                                        className={`inline-flex items-center rounded-full border text-sm px-3 py-1 ${category.colorClasses}`}
                                    >
                                        {skill}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
