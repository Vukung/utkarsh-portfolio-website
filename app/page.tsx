import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { OpenSourceSection } from "@/components/sections/open-source-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  return (
    <>
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[35%_65%] gap-20">
          {/* Left Sticky Sidebar */}
          <Sidebar />

          {/* Right Scrollable Content */}
          <main className="pt-4 pb-16 relative">
            {/* Navbar - Only visible over right column */}
            <div className="sticky top-0 z-50 -mx-6 mb-4">
              <Navbar />
            </div>

            {/* Skills */}
            <SkillsSection />
            <div className="mb-32" />

            {/* Experience */}
            <div id="experience">
              <ExperienceSection />
            </div>
            <div className="mb-32" />

            {/* Open Source */}
            <OpenSourceSection />
            <div className="mb-32" />

            {/* Projects */}
            <div id="projects">
              <ProjectsSection />
            </div>
            <div className="mb-32" />

            {/* Achievements */}
            <div id="achievements">
              <AchievementsSection />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
