
export interface Workout {
  id?: string;
  _id?: string;
  title?: string;
  name?: string; 
  description?: string;
  imageUrl?: string;
  image?: string;
  categoryTags?: string[];
  category?: string[];
  equipment?: string | string[];
  duration: number;
  calories: number;
  rating: number;
  difficulty?: string;
  sets?: number;
  reps?: string;
  instructions?: string[];
  [key: string]: any; 
}

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllWorkouts(): Promise<Workout[]> {
  
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }
  
  return res.json();
}

export async function getWorkoutById(id: string): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error("Failed to fetch workout details");
  }
  
  return res.json();
}