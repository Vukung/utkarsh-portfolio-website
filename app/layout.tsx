import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
