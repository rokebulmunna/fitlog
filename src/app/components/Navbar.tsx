"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-neutral-900 sticky top-0 z-50">
     
      <div className="py-4 px-5 md:px-8 lg:px-12 flex items-center justify-between max-w-7xl mx-auto">
        
      
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image 
            src="/logo.png" 
            alt="Fitlog Logo" 
            width={32} 
            height={32} 
            className="object-contain w-7 h-7 md:w-8 md:h-8"
          />
          <span className="text-white font-oswald text-xl md:text-2xl font-bold tracking-widest uppercase mt-1">
            Fitlog
          </span>
        </Link>

        
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link 
            href="/"
            className="bg-[#1a2e05] text-[#ccff00] px-5 lg:px-6 py-2 rounded-full text-xs lg:text-sm font-medium"
          >
            Workouts
          </Link>
          <Link 
            href="/my-plan"
            className="text-neutral-400 hover:text-white text-xs lg:text-sm font-medium"
          >
            My Plan
          </Link>
        </div>

        
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/my-plan" className="flex items-center gap-2 lg:gap-3">
            <span className="text-neutral-200 text-xs lg:text-sm font-medium">Plan</span>
            <span className="flex items-center justify-center bg-[#ccff00] text-black font-bold w-6 h-6 lg:w-7 lg:h-7 rounded-full text-xs">
              0
            </span>
          </Link>
          
          <Link href="/my-plan" className="flex items-center gap-2 lg:gap-3">
            <span className="text-neutral-400 text-xs lg:text-sm font-medium">Saved</span>
            <span className="flex items-center justify-center border border-neutral-700 text-neutral-400 w-6 h-6 lg:w-7 lg:h-7 rounded-full text-xs">
              0
            </span>
          </Link>
        </div>

        
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

     
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-neutral-900 px-5 py-6 flex flex-col gap-5">
          <Link 
            href="/" 
            className="bg-[#1a2e05] text-[#ccff00] px-6 py-3 rounded-full text-sm font-medium text-center w-full"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Workouts
          </Link>
          <Link 
            href="/my-plan" 
            className="text-neutral-400 hover:text-white text-sm font-medium text-center w-full border border-neutral-800 rounded-full py-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            My Plan
          </Link>

          <div className="flex items-center justify-between mt-2 pt-5 border-t border-neutral-900 px-4">
            <Link 
              href="/my-plan" 
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-neutral-200 text-sm font-medium">Plan</span>
              <span className="flex items-center justify-center bg-[#ccff00] text-black font-bold w-7 h-7 rounded-full text-xs">
                0
              </span>
            </Link>
            
            <Link 
              href="/my-plan" 
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-neutral-400 text-sm font-medium">Saved</span>
              <span className="flex items-center justify-center border border-neutral-700 text-neutral-400 w-7 h-7 rounded-full text-xs">
                0
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}