"use client";

import { LocationWidget } from "@/components/hero/location-widget";
import { ProfilePhoto } from "@/components/hero/profile-photo";
import { SocialLinks } from "@/components/hero/social-links";
import { personalInfo } from "@/lib/data";

export function Sidebar() {
    return (
        <aside className="lg:sticky lg:top-0 lg:max-h-screen lg:overflow-hidden py-8 lg:py-12 lg:pr-8">
            <div className="flex flex-col">
                {/* Profile Section */}
                <div className="mb-8">
                    <ProfilePhoto />
                    <h1 className="text-4xl font-bold mt-6 mb-2">
                        {personalInfo.name}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-3">
                        {personalInfo.role}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">
                            Available for work
                        </span>
                    </div>
                </div>

                {/* Short Bio */}
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {personalInfo.bio}
                </p>

                {/* Social Links */}
                <div className="mb-4">
                    <SocialLinks />
                </div>

                {/* Map Widget */}
                <div className="mt-4">
                    <LocationWidget />
                </div>
            </div>
        </aside>
    );
}
