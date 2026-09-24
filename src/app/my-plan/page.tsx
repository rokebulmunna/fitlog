"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, X, ChevronDown, Check } from "lucide-react";

interface Workout {
  id: string;
  name: string;
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  image: string;
}

type SortOption = "Duration" | "Calories" | "Rating";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("Duration");

  // Fetch items from localStorage based on active tab
  useEffect(() => {
    setIsLoading(true);
    const storageKey = activeTab === "today" ? "todaysPlan" : "savedPlan";
    
    setTimeout(() => {
      const storedData = JSON.parse(localStorage.getItem(storageKey) || "[]");
      setWorkouts(storedData);
      setIsLoading(false);
    }, 300);
  }, [activeTab]);

  // Sort logic based on selected option
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "Duration") {
      return b.duration - a.duration; // Highest duration first
    } else if (sortBy === "Calories") {
      return b.calories - a.calories; // Highest calories first
    } else if (sortBy === "Rating") {
      return b.rating - a.rating; // Highest rating first
    }
    return 0;
  });

  const totalExercises = workouts.length;
  const totalMinutes = workouts.reduce((acc, curr) => acc + curr.duration, 0);
  const totalCalories = workouts.reduce((acc, curr) => acc + curr.calories, 0);

  const removeWorkout = (id: string) => {
    const updatedWorkouts = workouts.filter(w => w.id !== id);
    setWorkouts(updatedWorkouts);
    
    const storageKey = activeTab === "today" ? "todaysPlan" : "savedPlan";
    localStorage.setItem(storageKey, JSON.stringify(updatedWorkouts));
    
    window.dispatchEvent(new Event("planUpdated"));
  };

  return (
    <div className="bg-[#131418] min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 w-full flex-grow flex flex-col">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-[44px] font-oswald font-bold uppercase text-white mb-2">
            MY PLAN
          </h1>
          <p className="text-neutral-400 text-sm md:text-base">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats Block */}
        <div className="bg-[#15171d] rounded-2xl p-6 md:p-8 mb-8 border border-neutral-800/50 flex flex-wrap gap-12 md:gap-32">
          <div className="flex flex-col gap-1">
            <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Exercises</span>
            <span className="text-4xl md:text-[44px] font-oswald font-bold text-[#ccff00] leading-none">
              {totalExercises}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Minutes</span>
            <span className="text-4xl md:text-[44px] font-oswald font-bold text-white leading-none">
              {totalMinutes}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-500 text-xs font-medium uppercase tracking-wider">Calories</span>
            <span className="text-4xl md:text-[44px] font-oswald font-bold text-white leading-none">
              {totalCalories}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center bg-[#15171d] border border-neutral-800/50 p-1 rounded-xl w-max">
            <button 
              onClick={() => setActiveTab("today")}
              className={`px-6 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === "today" 
                  ? "bg-[#23252d] text-white shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Today's Plan
            </button>
            <button 
              onClick={() => setActiveTab("saved")}
              className={`px-6 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === "saved" 
                  ? "bg-[#23252d] text-white shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Functional Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-neutral-500 text-xs font-medium">Sort By</span>
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-[#15171d] border border-neutral-800/50 px-4 py-2.5 pr-10 rounded-xl text-[13px] font-medium text-white hover:border-neutral-600 focus:outline-none cursor-pointer transition-colors"
              >
                <option value="Duration">Duration</option>
                <option value="Calories">Calories</option>
                <option value="Rating">Rating</option>
              </select>
              <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dynamic Content Area */}
        {isLoading ? (
          <div className="flex justify-center items-center py-24 flex-grow">
            <p className="text-neutral-400 font-medium text-lg animate-pulse">
              Loading workouts...
            </p>
          </div>
        ) : sortedWorkouts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {sortedWorkouts.map((workout) => (
              <div 
                key={workout.id} 
                className="flex flex-col md:flex-row md:items-center gap-5 bg-[#15171d] border border-neutral-800/50 rounded-2xl p-4 transition-all hover:border-neutral-700"
              >
                <div className="relative w-full md:w-[220px] aspect-[16/9] md:aspect-[2/1] rounded-xl overflow-hidden shrink-0 bg-neutral-800">
                  <Image 
                    src={workout.image} 
                    alt={workout.name} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, 220px"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="text-white font-oswald text-xl font-bold uppercase">{workout.name}</h3>
                  <p className="text-neutral-400 text-sm mt-1">{workout.equipment}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-neutral-400 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{workout.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#ccff00]">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{workout.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-0">
                  <Link 
                    href={`/workout/${workout.id}`}
                    className="flex-grow md:flex-grow-0 text-center border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white px-5 py-2.5 rounded-lg text-[13px] font-medium transition-colors"
                  >
                    View Details
                  </Link>
                  
                  {activeTab === "today" && (
                    <button 
                      onClick={() => removeWorkout(workout.id)}
                      className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 bg-[#ccff00] hover:bg-[#b3e600] text-black px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Mark as Done
                    </button>
                  )}
                  
                  <button 
                    onClick={() => removeWorkout(workout.id)}
                    className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center border border-dashed border-neutral-800 rounded-3xl py-24 px-6 mt-4">
            <h2 className="text-white font-oswald text-2xl md:text-[28px] font-bold uppercase mb-3">
              NOTHING HERE YET
            </h2>
            <p className="text-neutral-400 text-sm text-center mb-8">
              Browse the library and add a lift to get today moving.
            </p>
            <Link 
              href="/"
              className="bg-[#ccff00] hover:bg-[#b3e600] text-black px-8 py-3.5 rounded-[8px] text-[13px] font-bold tracking-wide transition-colors"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}