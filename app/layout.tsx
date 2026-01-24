import { ToastContainer } from "@/components/toast-container";
import { XPManager } from "@/components/xp/xp-manager";
import { EasterEggProvider } from "@/contexts/easter-egg-context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono, VT323 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Utkarsh Shirbhate | Software Engineer",
  description: "Software Engineer specializing in Application & Data Engineering. Building scalable solutions.",
  keywords: ["Utkarsh Shirbhate", "Software Engineer", "Application Engineering", "Data Engineering", "Full Stack Developer", "React", "Node.js", "Portfolio"],
  authors: [{ name: "Utkarsh Shirbhate" }],
  openGraph: {
    title: "Utkarsh Shirbhate | Software Engineer",
    description: "Software Engineer specializing in Application & Data Engineering. Check out my projects and experience.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${vt323.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EasterEggProvider>
            {children}
            <ToastContainer />
            <XPManager />
          </EasterEggProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}



