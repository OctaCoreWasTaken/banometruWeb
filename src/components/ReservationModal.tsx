"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteContent } from "@/lib/content";

interface Props {
  isOpen: boolean;
  initialTier: "general" | "vip";
  content: SiteContent;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

interface FormState {
  name: string;
  email: string;
  qty: number;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function ReservationModal({ isOpen, initialTier, content, onClose }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [tier, setTier] = useState<"general" | "vip">(initialTier);
  const [form, setForm] = useState<FormState>({ name: "", email: "", qty: 1 });
  const [errors, setErrors] = useState<FormErrors>({});
  const firstFocusRef = useRef<HTMLElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const openedByRef = useRef<HTMLElement | null>(null);

  const { tickets } = content;
  const tierData = tier === "general" ? tickets.general : tickets.vip;
  const total = tierData.price * form.qty;

  // Sync tier when modal opens
  useEffect(() => {
    if (isOpen) {
      setTier(initialTier);
      setStep(1);
      setForm({ name: "", email: "", qty: 1 });
      setErrors({});
      openedByRef.current = document.activeElement as HTMLElement;
      setTimeout(() => firstFocusRef.current?.focus(), 50);
    } else {
      openedByRef.current?.focus();
    }
  }, [isOpen, initialTier]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus trap
  const trapFocus = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const focusable = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#reservation-modal [href], #reservation-modal button, #reservation-modal input, #reservation-modal [tabindex]:not([tabindex='-1'])"
      )
    ).filter((el) => !el.hasAttribute("disabled"));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  const handleClose = () => {
    setStep(1);
    setForm({ name: "", email: "", qty: 1 });
    setErrors({});
    onClose();
  };

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Numele este obligatoriu.";
    if (!form.email.trim()) {
      e.email = "Email-ul este obligatoriu.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Adresă de email invalidă.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            id="reservation-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Rezervare bilet"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            onKeyDown={trapFocus}
          >
            <div className="relative w-full max-w-md bg-elevated border border-primary/30 rounded-card shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted hover:text-bright transition-colors duration-150 text-xl leading-none"
                aria-label="Închide"
              >
                ×
              </button>

              <div className="p-6 sm:p-8">
                {/* Step indicator */}
                <div className="flex items-center gap-2 mb-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-200 ${
                          step >= s ? "bg-primary text-bright" : "bg-surface text-muted border border-primary/30"
                        }`}
                      >
                        {s}
                      </div>
                      {s < 3 && <div className={`flex-1 w-8 h-px ${step > s ? "bg-primary" : "bg-primary/20"}`} />}
                    </div>
                  ))}
                </div>

                {/* ── Step 1: Tier selection ── */}
                {step === 1 && (
                  <div>
                    <h2 className="text-bright font-bold text-xl mb-6">Alege tipul biletului</h2>
                    <div className="flex flex-col gap-4 mb-6">
                      {(["general", "vip"] as const).map((t) => {
                        const td = t === "general" ? tickets.general : tickets.vip;
                        const selected = tier === t;
                        return (
                          <button
                            key={t}
                            ref={t === "general" ? (el) => { firstFocusRef.current = el; } : undefined}
                            onClick={() => setTier(t)}
                            className={`w-full text-left p-4 rounded-card border-2 transition-all duration-200 ${
                              selected
                                ? "border-primary bg-primary/10"
                                : "border-primary/20 bg-surface hover:border-primary/50"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-bright font-semibold">{td.label}</span>
                              <span className="text-primary font-bold text-lg">€{td.price}</span>
                            </div>
                            <ul className="mt-2 flex flex-col gap-1">
                              {td.perks.map((p) => (
                                <li key={p} className="text-muted text-sm flex items-center gap-2">
                                  <span className="text-primary">✓</span> {p}
                                </li>
                              ))}
                            </ul>
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3 rounded-pill bg-primary hover:bg-secondary text-bright font-semibold transition-colors duration-200"
                    >
                      Continuă
                    </button>
                  </div>
                )}

                {/* ── Step 2: Contact form ── */}
                {step === 2 && (
                  <div>
                    <h2 className="text-bright font-bold text-xl mb-6">Detalii de contact</h2>
                    <div className="flex flex-col gap-4 mb-4">
                      <div>
                        <label className="block text-muted text-sm mb-1" htmlFor="res-name">
                          Nume *
                        </label>
                        <input
                          ref={(el) => { firstFocusRef.current = el; }}
                          id="res-name"
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Numele tău"
                          className="w-full bg-surface border border-primary/30 focus:border-primary rounded-card px-4 py-2.5 text-bright placeholder-muted outline-none transition-colors duration-200"
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-muted text-sm mb-1" htmlFor="res-email">
                          Email *
                        </label>
                        <input
                          id="res-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                          placeholder="email@exemplu.ro"
                          className="w-full bg-surface border border-primary/30 focus:border-primary rounded-card px-4 py-2.5 text-bright placeholder-muted outline-none transition-colors duration-200"
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-muted text-sm mb-1" htmlFor="res-qty">
                          Număr de bilete *
                        </label>
                        <input
                          id="res-qty"
                          type="number"
                          min={1}
                          max={10}
                          value={form.qty}
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              qty: Math.max(1, Math.min(10, Number(e.target.value) || 1)),
                            }))
                          }
                          className="w-full bg-surface border border-primary/30 focus:border-primary rounded-card px-4 py-2.5 text-bright outline-none transition-colors duration-200"
                        />
                      </div>
                    </div>
                    <div className="p-4 rounded-card bg-surface border border-primary/20 mb-6">
                      <div className="flex justify-between text-sm text-muted mb-1">
                        <span>{tierData.label} × {form.qty}</span>
                        <span>€{tierData.price} / bilet</span>
                      </div>
                      <div className="flex justify-between text-bright font-bold text-lg">
                        <span>Total</span>
                        <span>€{total}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-3 rounded-pill border border-primary/30 text-muted hover:text-bright hover:border-primary transition-colors duration-200 text-sm"
                      >
                        Înapoi
                      </button>
                      <button
                        ref={(el) => { lastFocusRef.current = el; }}
                        onClick={() => { if (validate()) setStep(3); }}
                        className="flex-[2] py-3 rounded-pill bg-primary hover:bg-secondary text-bright font-semibold transition-colors duration-200"
                      >
                        Confirmă rezervarea
                      </button>
                    </div>
                  </div>
                )}

                {/* ── Step 3: Confirmation ── */}
                {step === 3 && (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-3xl mx-auto mb-6 glow-primary">
                      ✓
                    </div>
                    <h2 className="text-bright font-bold text-xl mb-2">Rezervare confirmată!</h2>
                    <p className="text-muted text-sm mb-6">
                      Rezervarea ta a fost înregistrată.
                    </p>
                    <div className="p-4 rounded-card bg-surface border border-primary/20 text-left mb-6">
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted">Tip bilet</span>
                        <span className="text-bright font-medium">{tierData.label}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-muted">Cantitate</span>
                        <span className="text-bright font-medium">{form.qty} {form.qty === 1 ? "bilet" : "bilete"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Total</span>
                        <span className="text-primary font-bold text-base">€{total}</span>
                      </div>
                    </div>
                    <p className="text-muted text-xs leading-relaxed mb-6 p-3 rounded-card bg-surface border border-primary/10">
                      {tickets.disclaimer}
                    </p>
                    <button
                      ref={(el) => { firstFocusRef.current = el; }}
                      onClick={handleClose}
                      className="w-full py-3 rounded-pill bg-primary hover:bg-secondary text-bright font-semibold transition-colors duration-200"
                    >
                      Închide
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
