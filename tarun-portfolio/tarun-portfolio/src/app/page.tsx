import { About } from "@/components/About";
import { Architecture } from "@/components/Architecture";
import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Lab } from "@/components/Lab";
import { Projects } from "@/components/Projects";
import { Ventures } from "@/components/Ventures";
import { Vision } from "@/components/Vision";

export default function Home() {
  return (
    <>
      <Hero />
      <Ventures />
      <Capabilities />
      <Projects />
      <Lab />
      <Architecture />
      <About />
      <Vision />
      <Contact />
    </>
  );
}
