"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { SiteContent, TeamMember } from "@/lib/content";

interface Props {
  content: SiteContent;
}

function Avatar({ member }: { member: TeamMember }) {
  if (!member.photo) {
    const initials = member.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    return (
      <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-bright bg-gradient-to-br from-primary to-accent select-none">
        {initials}
      </div>
    );
  }
  return (
    <div className="w-20 h-20 rounded-full mx-auto mb-4 relative overflow-hidden">
      <Image
        src={`/${member.photo}`}
        alt={member.name}
        fill
        className="object-cover"
      />
    </div>
  );
}

export default function Team({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  if (!content.sections.team.visible) return null;

  const { team } = content;

  return (
    <section id="echipa" ref={ref} className="py-24 px-4 bg-base">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-bright mb-4">
            {team.title}
          </h2>
          <p className="text-muted text-base sm:text-lg">{team.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.members.map((member, i) => (
            <motion.div
              key={`${member.name}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.1 }}
              className="text-center p-4 rounded-card bg-surface border border-primary/20 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <Avatar member={member} />
              <p className="text-bright font-semibold text-sm">{member.name}</p>
              <p className="text-muted text-xs mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
