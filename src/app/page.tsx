import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { WhySitesLeak } from "@/components/sections/WhySitesLeak";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { VisualAuditShowcase } from "@/components/sections/VisualAuditShowcase";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <WhySitesLeak />
      <CaseStudies />
      <Testimonials />
      <VisualAuditShowcase />
      <WhatYouGet />
      <FinalCTA />
    </main>
  );
}
