import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vadim Shiba | Fullstack Engineer",
  description:
    "Fullstack engineer focused on backend APIs, frontend UX, Telegram products, and production delivery.",
  openGraph: {
    title: "Vadim Shiba | Fullstack Engineer",
    description:
      "Backend APIs + frontend UX + DevOps delivery for production systems and Telegram ecosystems.",
    type: "website",
    url: "https://vadimshiba-landing.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
