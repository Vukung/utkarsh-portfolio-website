"use client";

import { Button } from "@/components/ui/button";
import { openSource } from "@/lib/data";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Download, ExternalLink, Github, Star, Users } from "lucide-react";
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

            <div className="relative border-l border-zinc-800 ml-3 space-y-16">
                {openSource.map((project, index) => {
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
                                {/* Logo - Large Size */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm overflow-hidden flex items-center justify-center">
                                        {(project as any).logo ? (
                                            <img
                                                src={(project as any).logo}
                                                alt={project.title}
                                                className="w-full h-full object-cover scale-110"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-gray-200">{projectInitials}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Header text info */}
                                <div className="flex-grow flex flex-col justify-center gap-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-100 leading-tight">{project.title}</h3>
                                    <div className="flex flex-col">
                                        <span className="text-base sm:text-lg text-gray-400 font-medium">
                                            Open Source Project
                                        </span>
                                        <span className="text-xs sm:text-sm text-gray-500 font-medium uppercase tracking-wide">
                                            {project.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="flex flex-col gap-2">
                                {/* Problem Statement (if exists) */}
                                {(project as any).problem && (
                                    <div className="mb-2 p-3 bg-purple-900/10 border-l-4 border-purple-500/50 rounded-r">
                                        <p className="text-sm font-medium text-purple-300">
                                            <span className="font-semibold text-purple-200">Problem: </span>
                                            {(project as any).problem}
                                        </p>
                                    </div>
                                )}

                                {/* Description & Stats */}
                                <div className="text-gray-200 text-sm leading-relaxed space-y-3">
                                    <p className="text-base text-gray-300">{project.description}</p>

                                    {/* Stats Row */}
                                    <div className="flex flex-wrap gap-4 py-1">
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
                                            <Download className="w-4 h-4 text-green-500" />
                                            <span className="font-semibold text-gray-200">{project.stats.downloads}</span>
                                            <span>downloads</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            <span className="font-semibold text-gray-200">{project.stats.stars}</span>
                                            <span>stars</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-400">
                                            <Users className="w-4 h-4 text-blue-500" />
                                            <span className="font-semibold text-gray-200">{project.stats.contributors}</span>
                                            <span>contributors</span>
                                        </div>
                                    </div>

                                    {/* Contributions (Highlights) */}
                                    <ul className="list-disc list-outside ml-5 space-y-2">
                                        {project.contributions.map((contribution, cIndex) => (
                                            <li key={cIndex} className="pl-1 text-gray-300 text-base">
                                                {contribution}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Collapsible Case Study */}
                                    {(project as any).caseStudy && (
                                        <div className="mt-4 pt-2">
                                            <button
                                                onClick={() => toggleExpand(index)}
                                                className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                            >
                                                {expandedIndex === index ? (
                                                    <>
                                                        <ChevronUp className="w-4 h-4" />
                                                        Hide Case Study
                                                    </>
                                                ) : (
                                                    <>
                                                        <ChevronDown className="w-4 h-4" />
                                                        Read Case Study
                                                    </>
                                                )}
                                            </button>

                                            {expandedIndex === index && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-4 space-y-4 pl-4 border-l-2 border-blue-500/20 text-sm text-gray-400"
                                                >
                                                    <div>
                                                        <h4 className="font-semibold text-gray-200 mb-1 text-base">Problem & Constraints</h4>
                                                        <p>{(project as any).caseStudy.problemAndConstraints}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-200 mb-1 text-base">Architecture</h4>
                                                        <p>{(project as any).caseStudy.architecture}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-200 mb-1 text-base">Key Decision</h4>
                                                        <p>{(project as any).caseStudy.keyDecision}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-200 mb-1 text-base">Business Impact</h4>
                                                        <p>{(project as any).caseStudy.businessImpact}</p>
                                                    </div>
                                                    {(project as any).caseStudy.whyItMatters && (
                                                        <div className="p-3 bg-yellow-900/20 border-l-4 border-yellow-600/50 rounded mt-3">
                                                            <h4 className="font-semibold text-yellow-200 mb-1">Why It Matters</h4>
                                                            <p className="text-gray-400">{(project as any).caseStudy.whyItMatters}</p>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Skills Pills */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-sm font-medium rounded-full bg-green-900/20 text-green-400 border border-green-900/30"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3 mt-4">
                                    <Button variant="outline" size="sm" className="h-8 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white" asChild>
                                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" />
                                            Live Project
                                        </a>
                                    </Button>
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
