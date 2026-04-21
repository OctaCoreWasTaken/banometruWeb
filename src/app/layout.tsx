import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { getContent } from "@/lib/content";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const content = getContent();

export const metadata: Metadata = {
  title: content.meta.siteName,
  description: content.meta.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" className={`${spaceGrotesk.className} h-full`}>
      <head>
        <style>{`
          .text-bright { color: #F0E6FF !important; }
          .text-muted  { color: #9966AA !important; }
          .bg-base     { background-color: #050008 !important; }
          .bg-surface  { background-color: #0D001A !important; }
          .bg-elevated { background-color: #150025 !important; }
          .bg-primary  { background-color: #73007C !important; }
          .bg-secondary{ background-color: #6B0466 !important; }
          .border-primary { border-color: #73007C !important; }
          header a, header a:visited { color: #F0E6FF !important; }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col bg-base text-bright antialiased">
        <Providers>
          <Navbar content={content} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
