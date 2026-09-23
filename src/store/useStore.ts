import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export interface Workout {
  _id: string;
  name: string;
  description: string;
  image: string;
  category: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
}


interface AppState {
  todaysPlan: Workout[];
  saved: Workout[];
}


export const useStore = create<AppState>()(
  persist(
    (set) => ({
      todaysPlan: [],
      saved: [],
    }),
    {
      name: 'fitlog-storage', 
    }
  )
);