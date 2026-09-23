import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${oswald.variable} font-sans bg-background text-white min-h-screen flex flex-col`}>
        {/* Navbar component will be imported here later */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer component will be imported here later */}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}