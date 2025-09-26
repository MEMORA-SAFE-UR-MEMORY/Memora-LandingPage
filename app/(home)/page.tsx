import AdvantagesSection from "@/components/home/AdvantagesSection";
import FeatureSection from "@/components/home/FeatureSection";
import { GallerySection } from "@/components/home/GallerySection";
import HeroSection from "@/components/home/HeroSection";
import SplitSection from "@/components/home/SplitSection";
import TeamSaySection from "@/components/home/TeamSaySection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <SplitSection />
      <FeatureSection />
      <AdvantagesSection />
      <TeamSaySection />
      <GallerySection />
    </div>
  );
}
