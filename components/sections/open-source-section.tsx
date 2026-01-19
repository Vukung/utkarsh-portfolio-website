"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { openSource } from "@/lib/data";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Download, ExternalLink, GitBranch, Github, Star, Users } from "lucide-react";
import { useState } from "react";

export function OpenSourceSection() {
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
                Open Source Contributions
            </motion.h2>

            <div className="space-y-6">
                {openSource.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <GitBranch className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-xl font-semibold">{project.title}</h3>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{project.duration}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Download className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="font-semibold">{project.stats.downloads}</span>
                                            <span className="text-muted-foreground">downloads</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                            <span className="font-semibold">{project.stats.stars}</span>
                                            <span className="text-muted-foreground">stars</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm">
                                            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                            <span className="font-semibold">{project.stats.contributors}</span>
                                            <span className="text-muted-foreground">contributors</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {/* Problem Statement */}
                                {(project as any).problem && (
                                    <div className="mb-4 p-3 bg-purple-500/10 border-l-4 border-purple-500 rounded">
                                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                                            <span className="font-semibold">Problem: </span>
                                            {(project as any).problem}
                                        </p>
                                    </div>
                                )}

                                <p className="text-base mb-4">{project.description}</p>

                                <div className="space-y-2 mb-4">
                                    {project.contributions.map((contribution, cIndex) => (
                                        <motion.div
                                            key={cIndex}
                                            className="flex gap-2"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 + cIndex * 0.05 }}
                                        >
                                            <span className="text-muted-foreground mt-1">•</span>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{contribution}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Collapsible Case Study */}
                                {(project as any).caseStudy && (
                                    <div className="mt-4 mb-4 border-t pt-4">
                                        <button
                                            onClick={() => toggleExpand(index)}
                                            className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline mb-3"
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
                                                    <p className="text-muted-foreground">{(project as any).caseStudy.problemAndConstraints}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Architecture</h4>
                                                    <p className="text-muted-foreground">{(project as any).caseStudy.architecture}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Key Decision</h4>
                                                    <p className="text-muted-foreground">{(project as any).caseStudy.keyDecision}</p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-1">Business Impact</h4>
                                                    <p className="text-muted-foreground">{(project as any).caseStudy.businessImpact}</p>
                                                </div>
                                                {(project as any).caseStudy.whyItMatters && (
                                                    <div className="p-3 bg-yellow-500/10 border-l-4 border-yellow-500 rounded mt-3">
                                                        <h4 className="font-semibold mb-1">Why It Matters</h4>
                                                        <p className="text-muted-foreground">{(project as any).caseStudy.whyItMatters}</p>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.skills.map((skill, sIndex) => (
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

                                <div className="flex gap-3">
                                    <Button variant="default" size="sm" asChild>
                                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Live Project
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="sm" asChild>
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4 mr-2" />
                                            GitHub
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
