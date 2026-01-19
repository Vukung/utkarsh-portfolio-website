"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { achievements, leadership } from "@/lib/data";
import { motion } from "framer-motion";
import { Award, Presentation, Trophy, Users } from "lucide-react";

const getIcon = (type: string) => {
    switch (type) {
        case "Leadership":
            return Users;
        case "Event Management":
            return Presentation;
        case "Competition":
            return Trophy;
        case "Certification":
        case "Academic":
            return Award;
        default:
            return Award;
    }
};

export function AchievementsSection() {
    return (
        <section className="py-4">
            <motion.h2
                className="text-3xl font-bold tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Leadership & Achievements
            </motion.h2>

            {/* Leadership */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Leadership Positions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leadership.map((item, index) => {
                        const Icon = getIcon(item.type);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-primary/10">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold mb-1">{item.title}</h4>
                                                <Badge variant="secondary" className="mb-2 text-xs">
                                                    {item.year}
                                                </Badge>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Achievements */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Awards & Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((item, index) => {
                        const Icon = getIcon(item.type);
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-md transition-shadow">
                                    <CardContent className="pt-6">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
                                                <Icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold mb-1">{item.title}</h4>
                                                <div className="flex gap-2 mb-2">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {item.year}
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        {item.type}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-1">{item.organization}</p>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
