import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider">404 - Page Not Found</h2>
      <p className="text-gray-400 mb-8">The route you are looking for does not exist.</p>
      <Link 
        href="/"
        className="bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-[#b3e600] transition"
      >
        Return Home
      </Link>
    </div>
  );
}