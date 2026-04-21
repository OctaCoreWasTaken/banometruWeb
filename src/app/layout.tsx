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
      <body className="min-h-full flex flex-col bg-base text-bright antialiased">
        <Providers>
          <Navbar content={content} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
