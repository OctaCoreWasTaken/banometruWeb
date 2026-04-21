"use client";

import Image from "next/image";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

export default function Footer({ content }: Props) {
  const { footer, meta } = content;

  return (
    <footer className="bg-surface border-t border-primary/20 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Nova Signal logo"
                fill
                className="object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-bright text-xs font-bold select-none">
                NS
              </div>
            </div>
            <span className="font-semibold text-bright text-sm">Nova Signal</span>
          </div>
          <p className="text-muted text-xs italic">{footer.tagline}</p>
        </div>

        {/* Links */}
        {footer.links.length > 0 && (
          <ul className="flex flex-wrap gap-4 justify-center">
            {footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted hover:text-bright text-xs transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Copyright */}
        <p className="text-muted text-xs text-center sm:text-right">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
