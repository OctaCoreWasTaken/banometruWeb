import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Program from "@/components/Program";
import Tickets from "@/components/Tickets";
import Budget from "@/components/Budget";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const content = getContent();

  return (
    <main>
      <Hero content={content} />
      <About content={content} />
      <Program content={content} />
      <Tickets content={content} />
      {content.sections.budget.visible && <Budget content={content} />}
      {content.sections.team.visible && <Team content={content} />}
      <Contact content={content} />
      <Footer content={content} />
    </main>
  );
}
