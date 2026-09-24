import Image from "next/image";
import WorkoutCard from "./components/WorkoutCard";


async function getWorkouts() {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store" 
    });
    
    if (!res.ok) {
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Failed to fetch workouts:", error);
    return [];
  }
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#131418] text-white flex flex-col items-center">
      
      
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-12 py-16 max-w-7xl mx-auto w-full">
        
        
        <div className="flex-1 flex flex-col items-start z-10 md:pr-10">
          <p className="text-[#ccff00] font-bold tracking-[0.15em] text-sm uppercase mb-4">
            Workout Library
          </p>
          
          <h1 className="text-6xl md:text-[84px] font-bold font-oswald uppercase leading-[0.95] tracking-tight mb-6">
            Train with intent. Log<br /> every set.
          </h1>
          
          <p className="text-neutral-400 max-w-[480px] text-[17px] leading-relaxed mb-10">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it<br /> into today's plan, and watch the week's work add up.
          </p>
          
          <a 
            href="#library"
            className="bg-[#ccff00] text-black px-8 py-3.5 font-bold text-sm tracking-wide rounded hover:bg-[#b3e600] transition inline-block"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        
        
        <div className="flex-1 w-full mt-12 md:mt-0 relative min-h-[400px] md:min-h-[600px] flex items-center justify-end">
           <Image 
             src="/banner.png" 
             alt="Workout Machine" 
             fill
             className="object-contain object-right"
             priority 
           />
        </div>
      </section>

      
      <section id="library" className="px-8 md:px-12 py-20 max-w-7xl mx-auto w-full">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold font-oswald uppercase">The Library</h2>
          <p className="text-neutral-400 mt-2 text-lg">Twelve lifts covering every major muscle group.</p>
        </div>
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts && workouts.length > 0 ? (
            workouts.map((workout: any, index: number) => (
              <WorkoutCard 
                key={workout._id || `workout-${index}`} 
                {...workout} 
              />
            ))
          ) : (
            <p className="text-neutral-500 col-span-full py-10">
              Loading workouts or no data available.
            </p>
          )}
        </div>
      </section>
      
    </main>
  );
}