import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";


interface WorkoutCardProps {
  _id: string;
  name: string;
  image: string;
  category: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
}

export default function WorkoutCard({
  _id,
  name,
  image,
  category,
  equipment,
  duration,
  calories,
  rating
}: WorkoutCardProps) {
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

      
      <div className="flex flex-col flex-grow p-5 border-t border-neutral-800/50">
        
       
        <div className="flex flex-wrap gap-2 mb-3">
          {category.map((cat, index) => (
            <span 
              key={index} 
              className="bg-[#ccff00] text-black text-[10px] font-extrabold tracking-wide px-2.5 py-1 rounded-full uppercase"
            >
              {cat}
            </span>
          ))}
        </div>

        
        <h3 className="text-white font-oswald text-xl font-bold uppercase truncate">
          {name}
        </h3>
        <p className="text-neutral-500 text-sm mt-1 mb-6 truncate">
          {equipment}
        </p>

        
        <div className="flex items-center gap-4 mt-auto text-neutral-400 text-xs font-medium">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>{calories} kcal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4" />
            <span>{rating}</span>
          </div>
        </div>
        
      </div>
    </Link>
  );
}