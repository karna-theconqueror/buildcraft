import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "next-themes";
import SearchModal from "@/components/SearchModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BuildCraft — Build Your Own X",
    template: "%s | BuildCraft",
  },
  description:
    "Master programming by building your favorite technologies from scratch. 450+ interactive tutorials with live code editors, auto-grading, and progress tracking.",
  keywords: ["programming", "tutorials", "learn to code", "build your own", "interactive", "coding"],
  authors: [{ name: "BuildCraft" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BuildCraft",
    title: "BuildCraft — Build Your Own X",
    description: "Master programming by building your favorite technologies from scratch.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildCraft — Build Your Own X",
    description: "Master programming by building your favorite technologies from scratch.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-black dark:bg-black dark:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SearchModal />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
