import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { WhySitesLeak } from "@/components/sections/WhySitesLeak";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <WhySitesLeak />
      <CaseStudies />
      <Testimonials />
    </main>
  );
}
