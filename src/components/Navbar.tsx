"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

export default function Navbar({ content }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-elevated/80 backdrop-blur-md border-b border-primary/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo + site name */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          style={{ color: "#F0E6FF" }}
          onClick={handleNavClick}
        >
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
            {/* Fallback radio-wave icon when logo not yet added */}
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-bright text-xs font-bold select-none">
              NS
            </div>
          </div>
          <span className="font-semibold text-bright tracking-wide text-sm sm:text-base">
            {content.meta.siteName}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {content.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-muted hover:text-bright text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#bilete"
          className="hidden md:inline-flex items-center px-4 py-2 rounded-pill bg-primary hover:bg-secondary text-bright text-sm font-semibold transition-colors duration-200"
        >
          Bilete
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded text-bright"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Meniu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-bright transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-bright transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-bright transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-elevated/95 backdrop-blur-md border-b border-primary/20">
          <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {content.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block text-bright font-medium py-1"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#bilete"
                onClick={handleNavClick}
                className="inline-flex items-center px-4 py-2 rounded-pill bg-primary text-bright text-sm font-semibold"
              >
                Bilete
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
