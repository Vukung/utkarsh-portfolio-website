"use client";

import { Card } from "@/components/ui/card";
import { education } from "@/lib/data";
import { motion } from "framer-motion";

export function EducationSection() {
    return (
        <section className="py-12">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Education
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
            >
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/50">
                                <tr className="border-b">
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Year</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Degree</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Institute</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Score</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {education.map((edu, index) => (
                                    <motion.tr
                                        key={index}
                                        className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <td className="px-6 py-4 text-sm font-medium">{edu.year}</td>
                                        <td className="px-6 py-4 text-sm">{edu.degree}</td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">{edu.institute}</td>
                                        <td className="px-6 py-4 text-sm font-semibold">{edu.score}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full border ${edu.remark === "Pursuing"
                                                    ? "badge-green"
                                                    : "badge-blue"
                                                    }`}
                                            >
                                                {edu.remark}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </motion.div>
        </section>
    );
}
