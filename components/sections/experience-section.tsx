"use client";

import { experience } from "@/lib/data";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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

            <div className="relative border-l border-zinc-800 ml-3 space-y-16">
                {experience.map((exp, index) => {
                    const companyInitials = exp.company.substring(0, 1).toUpperCase();
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
                                {/* Logo - Reduced Size */}
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm overflow-hidden flex items-center justify-center">
                                        {(exp as any).logo ? (
                                            <img
                                                src={(exp as any).logo}
                                                alt={exp.company}
                                                className="w-full h-full object-cover scale-115"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-foreground">{companyInitials}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Header text info */}
                                <div className="flex-grow flex flex-col justify-center gap-1">
                                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{exp.role}</h3>
                                    <div className="flex flex-col">
                                        <span className="text-base sm:text-lg text-muted-foreground font-medium">
                                            {exp.company}, {exp.company === "PulseOn-EV" ? "Remote" : "India"}
                                        </span>
                                        <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                                            {exp.duration} ({exp.period})
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Body Content - Starts from vertical line (unindented relative to logo) */}
                            <div className="flex flex-col gap-2">
                                {/* Description */}
                                <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                                    <p className="text-base text-muted-foreground">{exp.description}</p>

                                    {/* Highlights */}
                                    <ul className="list-disc list-outside ml-5 space-y-2">
                                        {exp.highlights.map((highlight, hIndex) => (
                                            <li key={hIndex} className="pl-1 text-muted-foreground text-base">
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Collapsible Case Study */}
                                    {(exp as any).caseStudy && (
                                        <div className="mt-4 pt-2">
                                            <button
                                                onClick={() => toggleExpand(index)}
                                                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
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
                                                    className="mt-4 space-y-4 pl-4 border-l-2 border-blue-500/20 text-sm text-muted-foreground"
                                                >
                                                    <div>
                                                        <h4 className="font-semibold text-foreground mb-1 text-base">Problem & Constraints</h4>
                                                        <p>{(exp as any).caseStudy.problemAndConstraints}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground mb-1 text-base">Architecture</h4>
                                                        <p>{(exp as any).caseStudy.architecture}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground mb-1 text-base">Key Decision</h4>
                                                        <p>{(exp as any).caseStudy.keyDecision}</p>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-foreground mb-1 text-base">Business Impact</h4>
                                                        <p>{(exp as any).caseStudy.businessImpact}</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Skills Pills */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {exp.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-sm font-medium rounded-full border badge-green"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
