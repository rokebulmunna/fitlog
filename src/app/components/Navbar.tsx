"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    // Function to check local storage and update numbers
    const updateCounts = () => {
      const todaysPlan = JSON.parse(localStorage.getItem("todaysPlan") || "[]");
      const savedPlan = JSON.parse(localStorage.getItem("savedPlan") || "[]");
      setPlanCount(todaysPlan.length);
      setSavedCount(savedPlan.length);
    };

    // Run on initial load
    updateCounts();

    // Listen for custom events when we add/remove items
    window.addEventListener("planUpdated", updateCounts);

    return () => {
      window.removeEventListener("planUpdated", updateCounts);
    };
  }, []);

  return (
    <nav className="w-full bg-[#0a0a0a] border-b border-neutral-900 px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50">
      
      {/* Brand */}
      <Link href="/" className="flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Fitlog Logo" 
          width={24} 
          height={24} 
          className="object-contain"
        />
        <span className="text-white font-oswald text-xl font-bold tracking-widest uppercase mt-1">
          Fitlog
        </span>
      </Link>

      {/* Center Links */}
      <div className="flex items-center gap-6">
        <Link 
          href="/" 
          className={`text-sm font-medium transition-colors ${
            pathname === "/" ? "text-[#ccff00]" : "text-neutral-400 hover:text-white"
          }`}
        >
          Workouts
        </Link>
        <Link 
          href="/my-plan" 
          className={`text-sm font-medium transition-colors ${
            pathname === "/my-plan" ? "text-[#ccff00]" : "text-neutral-400 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </div>

      {/* Right side stats */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="text-neutral-300 text-[15px] font-medium">Plan</span>
          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-colors ${
            planCount > 0 ? "bg-[#ccff00] text-black" : "border border-neutral-800 text-neutral-500"
          }`}>
            {planCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-neutral-400 text-[15px] font-medium">Saved</span>
          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-colors border border-neutral-800 ${
            savedCount > 0 ? "text-neutral-200" : "text-neutral-500"
          }`}>
            {savedCount}
          </span>
        </div>
      </div>
      
    </nav>
  );
}