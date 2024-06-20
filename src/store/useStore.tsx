import { create } from "zustand";

interface Survey {
  mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}

interface useLocalState {
  survey: Survey;
  setSurvey: (survey: Survey) => void;
}

export const useLocalStore = create<useLocalState>((set) => ({
  survey: {
    mood: 0,
    activities: 0,
    sleep: 0,
    calmness: 0,
    yourself_time: 0,
  },
  setSurvey: (survey: Survey) => set({ survey }),
}));
