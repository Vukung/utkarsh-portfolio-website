"use client";

import { Button } from "@/components/ui/button";
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

            <div className="relative border-l border-zinc-800 ml-3 space-y-16">
                {projects.map((project, index) => {
                    const projectInitials = project.title.substring(0, 1).toUpperCase();

                    return (
                        <motion.div
                            key={index}
                            className="relative pl-6 sm:pl-8"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Header: Logo + Info */}
                            <div className="flex flex-col sm:flex-row gap-6 mb-4 items-start">
                                {/* Logo - Large Size Placeholder */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm overflow-hidden flex items-center justify-center">
                                        {(project as any).logo ? (
                                            <img
                                                src={(project as any).logo}
                                                alt={project.title}
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        ) : (
                                            <FolderGit2 className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                                        )}
                                    </div>
                                </div>

                                {/* Header text info */}
                                <div className="flex-grow flex flex-col justify-center gap-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{project.title}</h3>
                                    <div className="flex flex-col">
                                        <span className="text-base sm:text-lg text-muted-foreground font-medium">
                                            Academic Project
                                        </span>
                                        <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                                            {project.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="flex flex-col gap-2">

                                {/* Description */}
                                <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                                    <p className="text-base text-muted-foreground">{project.description}</p>

                                    {/* Stats / Impact (if exists) */}
                                    {project.stats && (
                                        <div className="flex items-center gap-2 py-1">
                                            <div className="flex items-center gap-2 bg-green-900/10 border border-green-800/30 rounded-lg px-3 py-1.5 w-fit">
                                                <TrendingUp className="w-4 h-4 text-green-500" />
                                                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                                    {project.stats.impact || project.stats.accuracy}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Highlights */}
                                    <ul className="list-disc list-outside ml-5 space-y-2">
                                        {project.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="pl-1 text-muted-foreground text-base">
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Skills Pills */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-sm font-medium rounded-full border badge-green"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3 mt-4">
                                    {project.links.live && project.links.live !== "#" && (
                                        <Button variant="outline" size="sm" className="h-8 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white" asChild>
                                            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white" asChild>
                                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-3.5 h-3.5 mr-2" />
                                            GitHub
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
