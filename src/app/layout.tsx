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

const themeInitScript = `
(() => {
  try {
    const saved = localStorage.getItem("theme");
    const theme =
      saved === "light" || saved === "dark"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.dataset.theme = theme;
  } catch {}
})();
`;

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
