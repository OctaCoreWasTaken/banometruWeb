"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ReservationModal from "./ReservationModal";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

export default function Tickets({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<"general" | "vip">("general");

  const { tickets } = content;

  const openModal = (tier: "general" | "vip") => {
    setSelectedTier(tier);
    setModalOpen(true);
  };

  const tiers: Array<{ key: "general" | "vip"; data: typeof tickets.general; isVip: boolean }> = [
    { key: "general", data: tickets.general, isVip: false },
    { key: "vip", data: tickets.vip, isVip: true },
  ];

  return (
    <>
      <section id="bilete" ref={ref} className="py-24 px-4 bg-base">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-bright mb-4">
              {tickets.title}
            </h2>
            <p className="text-muted text-base sm:text-lg max-w-xl mx-auto">
              {tickets.subtitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-muted text-sm mb-12"
          >
            {tickets.totalSpots} locuri disponibile · 24 Iunie 2025
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {tiers.map(({ key, data, isVip }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 * i + 0.1 }}
                className={`relative flex flex-col p-6 rounded-card border transition-all duration-300 ${
                  isVip
                    ? "border-primary bg-elevated glow-primary"
                    : "border-primary/20 bg-surface hover:border-primary/50"
                }`}
              >
                {isVip && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-pill bg-primary text-bright text-xs font-bold tracking-wider uppercase">
                      VIP
                    </span>
                  </div>
                )}

                <div className="mb-4 mt-2">
                  <p className="text-muted text-sm font-medium uppercase tracking-widest mb-1">
                    {data.label}
                  </p>
                  <p className="text-bright text-4xl font-bold">
                    €{data.price}
                    <span className="text-muted text-sm font-normal"> / persoană</span>
                  </p>
                </div>

                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {data.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-muted text-sm">
                      <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openModal(key)}
                  className={`w-full py-3 rounded-pill font-semibold text-sm transition-all duration-200 ${
                    isVip
                      ? "bg-primary hover:bg-secondary text-bright"
                      : "border border-primary/40 hover:border-primary text-bright hover:bg-primary/10"
                  }`}
                >
                  Rezervă
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ReservationModal
        isOpen={modalOpen}
        initialTier={selectedTier}
        content={content}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
