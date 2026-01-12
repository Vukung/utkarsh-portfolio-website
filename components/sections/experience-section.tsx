"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { experience } from "@/lib/data";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export function ExperienceSection() {
    return (
        <section className="py-12">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Experience
            </motion.h2>

            <div className="space-y-6">
                {experience.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Briefcase className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-xl font-semibold">{exp.company}</h3>
                                        </div>
                                        <p className="text-base font-medium text-muted-foreground">{exp.role}</p>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-1">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span>{exp.duration}</span>
                                        </div>
                                        <Badge
                                            variant={exp.current ? "default" : "secondary"}
                                            className={exp.current ? "bg-green-600" : ""}
                                        >
                                            {exp.period}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base mb-4">{exp.description}</p>

                                <div className="space-y-2 mb-4">
                                    {exp.highlights.map((highlight, hIndex) => (
                                        <motion.div
                                            key={hIndex}
                                            className="flex gap-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + hIndex * 0.05 }}
                                        >
                                            <span className="text-muted-foreground mt-1">•</span>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{highlight}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {exp.skills.map((skill, sIndex) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + sIndex * 0.03 }}
                                        >
                                            <Badge variant="outline" className="text-xs">
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
