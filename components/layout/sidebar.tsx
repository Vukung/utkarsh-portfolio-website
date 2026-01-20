"use client";

import { LocationWidget } from "@/components/hero/location-widget";
import { ProfilePhoto } from "@/components/hero/profile-photo";
import { SocialLinks } from "@/components/hero/social-links";
import { education, personalInfo } from "@/lib/data";

export function Sidebar() {
    return (
        <aside className="lg:sticky lg:top-0 lg:max-h-screen lg:overflow-hidden py-8 lg:py-12 lg:pr-8">
            <div className="flex flex-col">
                {/* Profile Section - Compact Side-by-Side */}
                <div className="flex flex-row items-center gap-5 mb-5">
                    <div className="flex-shrink-0">
                        <ProfilePhoto className="w-28 h-28 sm:w-32 sm:h-32" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold leading-tight text-gray-100">
                            {personalInfo.name}
                        </h1>
                        <p className="text-lg text-muted-foreground font-medium mt-1">
                            {personalInfo.role}
                        </p>
                        <div className="flex items-center gap-2.5 mt-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                            <span className="text-sm text-muted-foreground font-medium">
                                Available for work
                            </span>
                        </div>
                    </div>
                </div>

                {/* Short Bio */}
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {personalInfo.bio}
                </p>

                {/* Social Links */}
                <div className="mb-6">
                    <SocialLinks />
                </div>

                {/* Scholastic Record - Compact */}
                <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-200 mb-3 uppercase tracking-wider">
                        Scholastic Record
                    </h3>
                    <div className="space-y-3 border-l border-zinc-800 ml-1">
                        {education.map((edu, index) => (
                            <div key={index} className="pl-4 relative">
                                <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 block"></span>
                                <div className="flex flex-col gap-0.5">
                                    <h4 className="text-sm font-medium text-gray-200 leading-tight">
                                        {edu.degree}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                        {edu.institute}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs font-semibold text-green-400 bg-green-900/10 px-1.5 py-0.5 rounded border border-green-900/20">
                                            {edu.score}
                                        </span>
                                        <span className="text-[10px] uppercase text-gray-500 font-medium tracking-wide">
                                            {edu.year}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Map Widget */}
                <div className="mt-auto">
                    <LocationWidget />
                </div>
            </div>
        </aside>
    );
}
