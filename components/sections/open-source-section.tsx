"use client";

import { Button } from "@/components/ui/button";
import { openSource } from "@/lib/data";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Download, ExternalLink, Github, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface GitHubStats {
    stars: number | string;
    downloads: number | string;
    contributors: number | string;
}

export function OpenSourceSection() {
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
                {openSource.map((project, index) => (
                    <OpenSourceProjectCard key={index} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}

function OpenSourceProjectCard({ project, index }: { project: typeof openSource[0], index: number }) {
    const [expandedIndex, setExpandedIndex] = useState<boolean>(false);
    const [stats, setStats] = useState<GitHubStats>({
        stars: project.stats.stars,
        downloads: project.stats.downloads,
        contributors: project.stats.contributors
    });

    const toggleExpand = () => {
        setExpandedIndex(!expandedIndex);
    };

    const projectInitials = project.title.substring(0, 1).toUpperCase();

    // Fetch real-time stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Extract owner/repo from GitHub link
                // Expected format: https://github.com/owner/repo
                const githubUrl = project.links.github;
                if (!githubUrl || githubUrl === "#" || !githubUrl.includes("github.com")) return;

                const urlParts = githubUrl.split("github.com/")[1].split("/");
                const owner = urlParts[0];
                const repo = urlParts[1];

                if (!owner || !repo) return;

                // 1. Fetch Repo Info (Stars)
                const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                const repoData = await repoResponse.json();

                // 2. Fetch Contributors (Count length of page 1, max 100)
                const contributorsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`);
                const contributorsData = await contributorsResponse.json();

                // 3. Fetch Releases (Downloads)
                const releasesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
                const releasesData = await releasesResponse.json();

                // Calculate Totals
                const stars = repoData.stargazers_count || stats.stars;

                let contributors = stats.contributors;
                if (Array.isArray(contributorsData)) {
                    contributors = contributorsData.length;
                    // If maxed out at 100, add a plus sign
                    if (contributors === 100) contributors = "100+";
                }

                let downloads = 0;
                if (Array.isArray(releasesData)) {
                    downloads = releasesData.reduce((acc: number, release: any) => {
                        return acc + release.assets.reduce((sum: number, asset: any) => sum + asset.download_count, 0);
                    }, 0);
                }
                // If no releases/downloads found but we have a baseline, keep baseline or use new?
                // If 0, maybe keep baseline "300+" if the API didn't return anything useful (e.g. downloads not on GitHub).
                // But user requested "real-time", so we should trust the API if it returns valid 0 (i.e. no releases).
                // However, "300+" implies existing success. 
                // Let's format it: if > 0, use it. if 0 and we have a string baseline, keep baseline?
                // User said "300+ downloads" in data.ts. If repo has 0 release downloads, showing 0 might be wrong if they count npm downloads.
                // For this specific request, I will show the API result if > 0, otherwise fallback to initial.
                const finalDownloads = downloads > 0 ? downloads : stats.downloads;

                setStats({
                    stars,
                    contributors,
                    downloads: finalDownloads
                });

            } catch (error) {
                console.error("Failed to fetch GitHub stats:", error);
                // Fail silently and keep static data
            }
        };

        fetchStats();
    }, [project.links.github]); // Run once on mount (or if link changes)

    return (
        <motion.div
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
                            <span className="text-2xl font-bold text-foreground">{projectInitials}</span>
                        )}
                    </div>
                </div>

                {/* Header text info */}
                <div className="flex-grow flex flex-col justify-center gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{project.title}</h3>
                    <div className="flex flex-col">
                        <span className="text-base sm:text-lg text-muted-foreground font-medium">
                            Open Source Project
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wide">
                            {project.duration}
                        </span>
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="flex flex-col gap-2">
                {/* Problem Statement (if exists) */}
                {(project as any).problem && (
                    <div className="mb-2 p-3 bg-purple-50 border-l-4 border-purple-200 dark:bg-purple-900/10 dark:border-purple-500/50 rounded-r">
                        <p className="text-sm font-medium text-purple-900 dark:text-purple-300">
                            <span className="font-semibold text-purple-700 dark:text-purple-200">Problem: </span>
                            {(project as any).problem}
                        </p>
                    </div>
                )}

                {/* Description & Stats */}
                <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                    <p className="text-base text-muted-foreground">{project.description}</p>

                    {/* Stats Row - Using Real-Time Stats */}
                    <div className="flex flex-wrap gap-4 py-1">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                            <Download className="w-4 h-4 text-green-600 dark:text-green-500" />
                            <span className="font-semibold text-foreground">{stats.downloads}</span>
                            <span>downloads</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-600 dark:text-yellow-500" />
                            <span className="font-semibold text-foreground">{stats.stars}</span>
                            <span>stars</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                            <Users className="w-4 h-4 text-blue-600 dark:text-blue-500" />
                            <span className="font-semibold text-foreground">{stats.contributors}</span>
                            <span>contributors</span>
                        </div>
                    </div>

                    {/* Contributions (Highlights) */}
                    <ul className="list-disc list-outside ml-5 space-y-2">
                        {project.contributions.map((contribution, cIndex) => (
                            <li key={cIndex} className="pl-1 text-muted-foreground text-base">
                                {contribution}
                            </li>
                        ))}
                    </ul>

                    {/* Collapsible Case Study */}
                    {(project as any).caseStudy && (
                        <div className="mt-4 pt-2">
                            <button
                                onClick={toggleExpand}
                                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                {expandedIndex ? (
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

                            {expandedIndex && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4 space-y-4 pl-4 border-l-2 border-blue-500/20 text-sm text-muted-foreground"
                                >
                                    {(project as any).caseStudy.howIFound && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-base">How I Found the Project</h4>
                                            <p className="whitespace-pre-line">{(project as any).caseStudy.howIFound}</p>
                                        </div>
                                    )}
                                    {(project as any).caseStudy.constraintsAndDesign && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-base">Constraints & Design Considerations</h4>
                                            <p className="whitespace-pre-line">{(project as any).caseStudy.constraintsAndDesign}</p>
                                        </div>
                                    )}
                                    {(project as any).caseStudy.architectureAndImprovements && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-base">Architecture & Forward-Looking Improvements</h4>
                                            <p className="whitespace-pre-line">{(project as any).caseStudy.architectureAndImprovements}</p>
                                        </div>
                                    )}

                                    {/* Fallback for old structure if needed, or remove if strictly replacing */}
                                    {(project as any).caseStudy.problemAndConstraints && !((project as any).caseStudy.constraintsAndDesign) && (
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-base">Problem & Constraints</h4>
                                            <p>{(project as any).caseStudy.problemAndConstraints}</p>
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
                            className="px-3 py-1.5 text-sm font-medium rounded-full border badge-green"
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
}
