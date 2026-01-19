"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { experience } from "@/lib/data";
import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ExperienceSection() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section className="py-4">
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
                                {/* Problem Statement */}
                                {(exp as any).problem && (
                                    <div className="mb-4 p-3 bg-blue-500/10 border-l-4 border-blue-500 rounded">
                                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                            <span className="font-semibold">Problem: </span>
                                            {(exp as any).problem}
                                        </p>
                                    </div>
                                )}

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

                                {/* Collapsible Case Study */}
                                {(exp as any).caseStudy && (
                                    <div className="mt-4 border-t pt-4">
                                        <button
                                            onClick={() => toggleExpand(index)}
                                            className="flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline mb-3"
                                        >
                                            {expandedIndex === index ? (
                                                <>
                                                    <ChevronUp className="w-4 h-4" />
                                                    Hide Case Study
                                                </>
                                            ) : (
                                                <>
                                                    <ChevronDown className="w-4 h-4" />
                                                    Read More - Case Study
                                                </>
                                            )}
                                        </button>

                                        {expandedIndex === index && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="space-y-3 text-sm"
                                            >
                                                <div>
                                                    <h4 className="font-semibold mb-1">Problem & Constraints</h4>
                                                    <p className="text-muted-foreground">{(exp as any).caseStudy.problemAndConstraints}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Architecture</h4>
                                                    <p className="text-muted-foreground">{(exp as any).caseStudy.architecture}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Key Decision</h4>
                                                    <p className="text-muted-foreground">{(exp as any).caseStudy.keyDecision}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Business Impact</h4>
                                                    <p className="text-muted-foreground">{(exp as any).caseStudy.businessImpact}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mt-4">
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
