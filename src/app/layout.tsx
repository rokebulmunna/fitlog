import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Fitlog | Train with intent",
  description: "A dark, no-nonsense gym companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      {/* 
        min-h-screen and flex-col ensure the footer is always pushed 
        to the bottom even if the page content is short.
      */}
      <body className="bg-[#131418] text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        
        {/* Main content wrapper */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}