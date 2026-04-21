"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

export default function Program({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { program } = content;

  return (
    <section id="program" ref={ref} className="py-24 px-4 bg-base">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold text-bright text-center mb-16"
        >
          {program.title}
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Central line (desktop) */}
          <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 -translate-x-1/2" />

          <div className="flex flex-col gap-12">
            {program.items.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={`${item.time}-${i}`}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * i, ease: "easeOut" }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-4 ${
                    isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div
                    className={`flex-1 p-5 rounded-card bg-surface border border-primary/20 hover:border-primary/50 transition-colors duration-300 ${
                      isLeft ? "sm:text-right" : "sm:text-left"
                    }`}
                  >
                    <p className="text-muted text-xs font-semibold tracking-widest uppercase mb-1">
                      {item.time}
                    </p>
                    <h3 className="text-bright font-semibold text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Centre dot */}
                  <div className="hidden sm:flex w-4 h-4 rounded-full bg-primary border-2 border-base flex-shrink-0 relative z-10 glow-primary" />

                  {/* Empty spacer for alternating layout */}
                  <div className="hidden sm:block flex-1" />

                  {/* Mobile left line */}
                  <div className="sm:hidden absolute -left-4 top-6 bottom-0 w-px bg-primary/30" />
                  <div className="sm:hidden absolute -left-4 top-6 w-2 h-2 rounded-full bg-primary -translate-x-1/2 flex-shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
