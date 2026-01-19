"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { projects } from "@/lib/data";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Github, TrendingUp } from "lucide-react";

export function ProjectsSection() {
    return (
        <section className="py-4">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Academic Projects
            </motion.h2>

            <div className="grid grid-cols-1 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2">
                                            <FolderGit2 className="w-5 h-5 text-muted-foreground" />
                                            <h3 className="text-xl font-semibold">{project.title}</h3>
                                        </div>
                                        <span className="text-sm text-muted-foreground">{project.duration}</span>
                                    </div>

                                    {/* Impact/Stats */}
                                    {project.stats && (
                                        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg px-3 py-2 w-fit">
                                            <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                                {project.stats.impact || project.stats.accuracy}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>

                            <CardContent>
                                <p className="text-base mb-4">{project.description}</p>

                                <div className="space-y-2 mb-4">
                                    {project.highlights.map((highlight, hIndex) => (
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
                                            Live Demo
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
