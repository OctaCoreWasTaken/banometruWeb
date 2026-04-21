"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { SiteContent } from "@/lib/content";

interface Props {
  content: SiteContent;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact({ content }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const { contact } = content;

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Numele este obligatoriu.";
    if (!form.email.trim()) {
      e.email = "Email-ul este obligatoriu.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Adresă de email invalidă.";
    }
    if (!form.message.trim()) e.message = "Mesajul este obligatoriu.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const inputClass =
    "w-full bg-surface border border-primary/30 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-card px-4 py-3 text-bright placeholder-muted transition-colors duration-200";

  return (
    <section id="contact" ref={ref} className="py-24 px-4 bg-surface">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-bright mb-4">
            {contact.title}
          </h2>
          <p className="text-muted text-base">{contact.description}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-3xl mx-auto mb-6 glow-primary">
                ✓
              </div>
              <h3 className="text-bright font-bold text-xl mb-2">Mesaj trimis!</h3>
              <p className="text-muted">
                Îți mulțumim! Te vom contacta în curând.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
              <div>
                <label className="block text-muted text-sm mb-1.5" htmlFor="ct-name">
                  Nume *
                </label>
                <input
                  id="ct-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Numele tău"
                  className={inputClass}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-muted text-sm mb-1.5" htmlFor="ct-email">
                  Email *
                </label>
                <input
                  id="ct-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="email@exemplu.ro"
                  className={inputClass}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-muted text-sm mb-1.5" htmlFor="ct-message">
                  Mesaj *
                </label>
                <textarea
                  id="ct-message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Scrie mesajul tău aici..."
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-pill bg-primary hover:bg-secondary text-bright font-semibold transition-colors duration-200"
              >
                Trimite mesajul
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
