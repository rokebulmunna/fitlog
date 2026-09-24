import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard(props: any) {
  const _id = props.id || '';
  const name = props.name || 'Unknown Workout';
  const image = props.image || "/banner.png";
  
  
  const categoryArray = props.muscleGroups || [];
  
  const equipment = props.equipment || 'No equipment specified';
  const duration = props.duration || 0;
  const calories = props.caloriesBurned || 0;
  const rating = props.rating || 0;

  return (
    <Link 
      href={`/workout/${_id}`} 
      className="flex flex-col bg-[#1a1c23] rounded-2xl overflow-hidden hover:scale-[1.02] hover:ring-1 hover:ring-[#ccff00] transition-all duration-300"
    >
     
      <div className="relative w-full aspect-[4/3] bg-neutral-800">
        <Image 
          src={image} 
          alt={name} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      
      <div className="flex flex-col flex-grow p-6">
        
        
        {categoryArray.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mb-4">
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

        
        <h3 className="text-white font-oswald text-[22px] font-bold uppercase truncate">
          {name}
        </h3>
        <p className="text-neutral-400 text-sm mt-1.5 truncate">
          {equipment}
        </p>

       
        <div className="w-full h-px bg-neutral-800/80 my-5" />

      
        <div className="flex items-center gap-5 mt-auto text-neutral-400 text-[13px] font-medium">
          <div className="flex items-center gap-2">
            <Clock className="w-[14px] h-[14px]" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="w-[14px] h-[14px]" />
            <span>{calories} kcal</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-[14px] h-[14px]" />
            <span>{rating}</span>
          </div>
        </div>
        
      </div>
    </Link>
  );
}