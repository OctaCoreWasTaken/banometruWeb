"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

const colorMap: Record<string, string> = {
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  highlight: "var(--color-highlight)",
};

export default function Budget({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!content.sections.budget.visible) return null;

  const { budget } = content;
  const total = budget.items.reduce((sum, i) => sum + i.amount, 0);

  return (
    <section id="buget" ref={ref} className="py-24 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-bright mb-4">
            {budget.title}
          </h2>
          <p className="text-muted text-base sm:text-lg">{budget.subtitle}</p>
        </motion.div>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="text-center p-5 rounded-card bg-elevated border border-primary/20">
            <p className="text-muted text-xs uppercase tracking-widest mb-1">Investiție</p>
            <p className="text-bright text-2xl font-bold">€{budget.investment.toLocaleString()}</p>
          </div>
          <div className="text-center p-5 rounded-card bg-elevated border border-highlight/20">
            <p className="text-muted text-xs uppercase tracking-widest mb-1">Venituri bilete</p>
            <p className="text-bright text-2xl font-bold">€{budget.totalRevenue.toLocaleString()}</p>
          </div>
          <div className="text-center p-5 rounded-card bg-elevated border border-highlight/30">
            <p className="text-muted text-xs uppercase tracking-widest mb-1">Net pentru Nova Signal</p>
            <p className="text-2xl font-bold" style={{ color: colorMap.highlight }}>
              €{budget.netRaised.toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Animated bars */}
        <div className="flex flex-col gap-5">
          {budget.items.map((item, i) => {
            const pct = Math.round((item.amount / total) * 100);
            const barColor = colorMap[item.color] ?? item.color;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i + 0.2 }}
              >
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-bright text-sm font-medium">{item.label}</span>
                  <span className="text-muted text-sm">€{item.amount.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-elevated rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.2 * i + 0.3, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: barColor }}
                  />
                </div>
                <p className="text-muted text-xs mt-1">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
