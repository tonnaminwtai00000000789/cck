import HeroSection from '@/components/homepage/HeroSection';
import ProjectIntro from '@/components/homepage/ProjectIntro';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าแรก | ถังขยะรักโลก : DIY",
};

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ProjectIntro />
            <FeaturesSection />
        </>
    );
}
