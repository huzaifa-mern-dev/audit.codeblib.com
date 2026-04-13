import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { WhySitesLeak } from "@/components/sections/WhySitesLeak";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ProofOfExcellence } from "@/components/sections/ProofOfExcellence";
import { Testimonials } from "@/components/sections/Testimonials";
import { VisualAuditShowcase } from "@/components/sections/VisualAuditShowcase";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { PostcodeChecker } from "@/components/sections/PostcodeChecker";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <WhySitesLeak />
      <CaseStudies />
      <ProofOfExcellence />
      <Testimonials />
      <VisualAuditShowcase />
      <WhatYouGet />
      <PostcodeChecker />
      <FinalCTA />
    </main>
  );
}
