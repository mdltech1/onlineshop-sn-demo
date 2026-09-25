import { Hero } from "@/components/sections/Hero";
import { Categories } from "@/components/sections/Categories";
import { Catalogue } from "@/components/sections/Catalogue";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WeeklyPicks } from "@/components/sections/WeeklyPicks";
import { SocialCommerce } from "@/components/sections/SocialCommerce";
import { Contact } from "@/components/sections/Contact";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Catalogue />
      <HowItWorks />
      <WeeklyPicks />
      <SocialCommerce />
      <Contact />
      <FinalCta />
    </>
  );
}
