"use client";

import { useState, useEffect } from "react";
import { CalendarPlus, Bookmark } from "lucide-react";

export default function WorkoutActions({ workout }: { workout: any }) {
  const [inToday, setInToday] = useState(false);
  const [inSaved, setInSaved] = useState(false);

  const workoutItem = {
    id: workout.id || workout._id,
    name: workout.name,
    equipment: workout.equipment || 'No equipment',
    duration: workout.duration || 0,
    calories: workout.caloriesBurned || workout.calories || 0,
    rating: workout.rating || 0,
    image: workout.image || "/banner.png"
  };

  // Check initial storage state
  useEffect(() => {
    const todays = JSON.parse(localStorage.getItem("todaysPlan") || "[]");
    const saved = JSON.parse(localStorage.getItem("savedPlan") || "[]");

    setInToday(todays.some((item: any) => item.id === workoutItem.id));
    setInSaved(saved.some((item: any) => item.id === workoutItem.id));
  }, [workoutItem.id]);

  const handleAction = (targetKey: "todaysPlan" | "savedPlan", msg: string) => {
    const todays = JSON.parse(localStorage.getItem("todaysPlan") || "[]");
    const saved = JSON.parse(localStorage.getItem("savedPlan") || "[]");

    // Remove from both lists first to ensure mutual exclusivity
    const filteredTodays = todays.filter((item: any) => item.id !== workoutItem.id);
    const filteredSaved = saved.filter((item: any) => item.id !== workoutItem.id);

    if (targetKey === "todaysPlan") {
      if (inToday) {
        // Toggle off if already in today's plan
        localStorage.setItem("todaysPlan", JSON.stringify(filteredTodays));
        setInToday(false);
        alert("Removed from Today's Plan.");
      } else {
        // Add to today, remove from saved
        localStorage.setItem("todaysPlan", JSON.stringify([...filteredTodays, workoutItem]));
        localStorage.setItem("savedPlan", JSON.stringify(filteredSaved));
        setInToday(true);
        setInSaved(false);
        alert(msg);
      }
    } else {
      if (inSaved) {
        // Toggle off if already saved
        localStorage.setItem("savedPlan", JSON.stringify(filteredSaved));
        setInSaved(false);
        alert("Removed from saved items.");
      } else {
        // Add to saved, remove from today
        localStorage.setItem("savedPlan", JSON.stringify([...filteredSaved, workoutItem]));
        localStorage.setItem("todaysPlan", JSON.stringify(filteredTodays));
        setInSaved(true);
        setInToday(false);
        alert(msg);
      }
    }

    // Refresh navbar counts
    window.dispatchEvent(new Event("planUpdated"));
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Today's Plan Button */}
      <button 
        onClick={() => handleAction("todaysPlan", "Added to Today's Plan!")}
        className={`flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-[13px] font-bold tracking-wide transition-colors ${
          inToday 
            ? "bg-[#a3cc00] text-black" 
            : "bg-[#ccff00] text-black hover:bg-[#b3e600]"
        }`}
      >
        <CalendarPlus className="w-4 h-4" />
        {inToday ? "In Today's Plan" : "Add to today's plan"}
      </button>

      {/* Save for Later Button */}
      <button 
        onClick={() => handleAction("savedPlan", "Saved for later!")}
        className={`flex items-center gap-2 px-6 py-3.5 rounded-[8px] text-[13px] font-medium transition-all ${
          inSaved 
            ? "bg-neutral-800 text-white border border-neutral-700" 
            : "bg-transparent border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        {inSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}