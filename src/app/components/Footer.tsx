import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] py-8 px-6 md:px-12 mt-auto border-t border-neutral-900">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo and Brand */}
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

        {/* Right: Copyright Text */}
        <p className="text-neutral-500 text-[13px] md:text-sm font-medium">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
        
      </div>
    </footer>
  );
}