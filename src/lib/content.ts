import rawContent from "../../content.json";

export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}

export interface ProgramItem {
  time: string;
  title: string;
  description: string;
}

export interface TicketTier {
  price: number;
  label: string;
  perks: string[];
}

export interface BudgetItem {
  label: string;
  amount: number;
  description: string;
  color: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SiteContent {
  meta: {
    siteName: string;
    tagline: string;
    date: string;
    venue: string;
    city: string;
  };
  nav: {
    links: NavLink[];
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
    backgroundImage: string;
  };
  about: {
    title: string;
    description: string;
    pillars: Pillar[];
  };
  program: {
    title: string;
    items: ProgramItem[];
  };
  tickets: {
    title: string;
    subtitle: string;
    general: TicketTier;
    vip: TicketTier;
    totalSpots: number;
    disclaimer: string;
  };
  budget: {
    title: string;
    subtitle: string;
    items: BudgetItem[];
    totalRevenue: number;
    investment: number;
    netRaised: number;
  };
  team: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    email: string;
  };
  footer: {
    tagline: string;
    copyright: string;
    links: FooterLink[];
  };
  sections: {
    budget: { visible: boolean };
    team: { visible: boolean };
  };
}

export function getContent(): SiteContent {
  return rawContent as SiteContent;
}
