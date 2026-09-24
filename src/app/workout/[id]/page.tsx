import Image from "next/image";
import WorkoutActions from "@/app/components/WorkoutActions";


async function getWorkoutDetail(id: string) {
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      cache: "no-store"
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch workout details:", error);
    return null;
  }
}

export default async function WorkoutDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const workout = await getWorkoutDetail(resolvedParams.id);

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-neutral-400">
        Workout not found or failed to load.
      </div>
    );
  }

  const categoryArray = workout.muscleGroups || [];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        
        <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square bg-[#1a1c23] rounded-3xl overflow-hidden">
          <Image 
            src={workout.image || "/banner.png"} 
            alt={workout.name || "Workout"} 
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        
        <div className="flex flex-col">
          <h1 className="text-4xl md:text-[44px] font-oswald font-bold uppercase leading-tight mb-4 text-white">
            {workout.name}
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-6">
            {workout.description}
          </p>

          {categoryArray.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-8">
              {categoryArray.map((cat: string, index: number) => (
                <span 
                  key={index} 
                  className="bg-[#ccff00] text-black text-[11px] font-black tracking-wider px-3 py-1 rounded-[4px] uppercase"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="bg-[#15171d] rounded-2xl p-6 md:p-8 mb-10 flex flex-col gap-5 border border-neutral-800/50">
            <StatRow label="EQUIPMENT" value={workout.equipment} />
            <StatRow label="DIFFICULTY" value={workout.difficulty} />
            <StatRow label="SETS" value={workout.sets} />
            <StatRow label="REPS" value={workout.reps} />
            <StatRow label="DURATION" value={`${workout.duration} min`} />
            <StatRow label="CALORIES" value={`${workout.caloriesBurned} kcal`} />
            <StatRow label="RATING" value={workout.rating} />
          </div>

          {workout.instructions && workout.instructions.length > 0 && (
            <div className="mb-10">
              <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-5">
                Instructions
              </h3>
              <ol className="space-y-4">
                {workout.instructions.map((step: string, index: number) => (
                  <li key={index} className="text-neutral-400 text-sm flex gap-3 leading-relaxed">
                    <span className="text-neutral-500 font-medium">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          
          <WorkoutActions workout={workout} />

        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between">
      <span className="text-neutral-500 text-xs font-bold tracking-widest uppercase">{label}</span>
      <span className="text-neutral-200 text-sm font-medium text-right">{value}</span>
    </div>
  );
}