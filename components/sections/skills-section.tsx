"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { skills } from "@/lib/data";
import { motion } from "framer-motion";
import { Code2, Layout, Server, Wrench } from "lucide-react";

const skillCategories = [
    {
        title: "Languages",
        icon: Code2,
        skills: skills.languages,
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    {
        title: "Frontend",
        icon: Layout,
        skills: skills.frontend,
        color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    },
    {
        title: "Backend",
        icon: Server,
        skills: skills.backend,
        color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
    {
        title: "Tools",
        icon: Wrench,
        skills: skills.tools,
        color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    },
];

export function SkillsSection() {
    return (
        <section className="py-12">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Skills
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category, categoryIndex) => {
                    const Icon = category.icon;
                    return (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`p-2 rounded-lg ${category.color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{category.title}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                                        >
                                            <Badge variant="secondary" className="text-sm">
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
