"use client";

import AdvantagesSection from "@/components/home/AdvantagesSection";
import FeatureSection from "@/components/home/FeatureSection";
import HeroSection from "@/components/home/HeroSection";
import IntroductionSection from "@/components/home/IntroductionSection";
import SplitSection from "@/components/home/SplitSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      {/* <IntroductionSection /> */}
      <SplitSection />
      <FeatureSection />
      <AdvantagesSection />
    </div>
  );
}
