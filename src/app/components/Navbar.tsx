import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0a0a0a] py-4 px-6 md:px-12 flex items-center justify-between border-b border-neutral-900">
      
      {/* Left: Logo and Brand Name */}
      <Link href="/" className="flex items-center gap-3">
        <Image 
          src="/logo.png" 
          alt="Fitlog Logo" 
          width={32} 
          height={32} 
          className="object-contain"
        />
        <span className="text-white font-oswald text-2xl font-bold tracking-widest uppercase mt-1">
          Fitlog
        </span>
      </Link>

      {/* Center: Navigation Links */}
      <div className="flex items-center gap-6">
        <Link 
          href="/"
          className="bg-[#1a2e05] text-[#ccff00] px-6 py-2 rounded-full text-sm font-medium"
        >
          Workouts
        </Link>
        <Link 
          href="/my-plan"
          className="text-neutral-400 hover:text-white text-sm font-medium"
        >
          My Plan
        </Link>
      </div>

      {/* Right: Status Badges */}
      <div className="flex items-center gap-8">
        
        {/* Plan Badge */}
        <Link href="/my-plan" className="flex items-center gap-3">
          <span className="text-neutral-200 text-sm font-medium">Plan</span>
          <span className="flex items-center justify-center bg-[#ccff00] text-black font-bold w-7 h-7 rounded-full text-xs">
            0
          </span>
        </Link>
        
        {/* Saved Badge */}
        <Link href="/my-plan" className="flex items-center gap-3">
          <span className="text-neutral-400 text-sm font-medium">Saved</span>
          <span className="flex items-center justify-center border border-neutral-700 text-neutral-400 w-7 h-7 rounded-full text-xs">
            0
          </span>
        </Link>
        
      </div>
    </nav>
  );
}