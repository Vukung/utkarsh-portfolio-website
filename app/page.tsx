import { HeroSection } from "@/components/hero/hero-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { OpenSourceSection } from "@/components/sections/open-source-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="container max-w-3xl mx-auto px-6">
        {/* Hero Section */}
        <div id="home">
          <HeroSection />
        </div>

        {/* Education */}
        <EducationSection />

        {/* Skills */}
        <SkillsSection />

        {/* Experience (Internships) */}
        <div id="experience">
          <ExperienceSection />
        </div>

        {/* Open Source */}
        <OpenSourceSection />

        {/* Academic Projects */}
        <div id="projects">
          <ProjectsSection />
        </div>

        {/* Leadership & Achievements */}
        <div id="achievements">
          <AchievementsSection />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
