"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

export default function About({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { about } = content;

  return (
    <section
      id="despre"
      ref={ref}
      className="py-24 px-4 bg-surface"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-bright mb-6">
            {about.title}
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {about.description}
          </p>
        </motion.div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {about.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 * (i + 1), ease: "easeOut" }}
              className="group relative p-6 rounded-card bg-elevated border border-primary/20 hover:border-primary/60 transition-all duration-300 glow-primary-hover cursor-default"
            >
              <div className="text-4xl mb-4">{pillar.icon}</div>
              <h3 className="text-bright font-semibold text-lg mb-2">
                {pillar.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {pillar.description}
              </p>
              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-tr-card pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
