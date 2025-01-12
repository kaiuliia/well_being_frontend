import { create } from "zustand";
import { formatDate, Survey } from "../components/dashboard/types";
import { API_URL } from "../env";

export interface ApiSurvey {
  id: string;
  user_id: string;
  date: string;
  general_mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}
interface Advice {
  title: string;
  advices: string[];
}
export interface useLocalState {
  weekDates: Date[];
  setWeekDates: (weekDates: Date[]) => void;
  dashboard: ApiSurvey[];
  fetchAndUpdateDashboard: () => Promise<void>;
  getTodayAdvice: () => Promise<void>;
  postSurveyData: (setSurvey: Survey) => Promise<void>;
  adviceToday: boolean;
  setAdviceToday: (adviceToday: boolean) => void;
  advicesArray: Advice[];
  setAdvicesArray: (advicesArray: Advice[]) => void;
}

function fillMissingDates(
  data: ApiSurvey[],
  startDate: Date,
  endDate: Date,
): ApiSurvey[] {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  const currentDate = new Date(startDate);
  const filledData: ApiSurvey[] = [];

  while (currentDate <= endDate) {
    const formattedDate = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1,
    ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

    const existingData = data.find((item) => item.date === formattedDate);

    if (existingData) {
      filledData.push(existingData);
    } else {
      filledData.push({
        date: formattedDate,
        id: "",
        user_id: "",
        general_mood: 0,
        sleep: 0,
        activities: 0,
        yourself_time: 0,
        calmness: 0,
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledData;
}

export const useLocalStore = create<useLocalState>((set, get) => ({
  weekDates: [],
  setWeekDates: (newWeekDates: Date[]) => set({ weekDates: newWeekDates }),
  dashboard: [],
  adviceToday: true,
  setAdviceToday: (newAdviceToday: boolean) =>
    set({ adviceToday: newAdviceToday }),

  advicesArray: [] as Advice[],
  setAdvicesArray: (newAdvicesArray: Advice[]) =>
    set({ advicesArray: newAdvicesArray }),
  fetchAndUpdateDashboard: async (): Promise<void> => {
    const { weekDates } = get();
    if (
      weekDates[0] === undefined ||
      weekDates[weekDates.length - 1] === undefined
    ) {
      return;
    }

    const isoStartDate = weekDates[0]?.toISOString();
    const isoEndDate = weekDates[weekDates.length - 1]
      ?.toISOString()
      .slice(0, 10);

    try {
      const response = await fetch(
        `${API_URL}/survey?startDate=${isoStartDate}&endDate=${isoEndDate}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (response.status > 299) {
        console.log("fetch error");
      } else {
        const data = await response.json();
        if (data.length >= 0) {
          set({
            dashboard: fillMissingDates(
              data,
              weekDates[0],
              weekDates[weekDates.length - 1],
            ),
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  getTodayAdvice: async () => {
    const { setAdviceToday, setAdvicesArray } = get();
    try {
      const response = await fetch(`${API_URL}/dashboard/advice`, {
        method: "GET",
        credentials: "include",
      });
      if (response.status > 299) {
        console.log("fetch error");
      } else {
        const data = await response.json();

        if (data.length > 0) {
          setAdviceToday(true);
          setAdvicesArray(data);
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  },

  postSurveyData: async (survey: Survey) => {
    try {
      const response = await fetch(`${API_URL}/survey`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          general_mood: survey.general_mood,
          activities: survey.activities,
          sleep: survey.sleep,
          calmness: survey.calmness,
          yourself_time: survey.yourself_time,
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      if (response.status > 299) {
        const error = await response.json();
        console.log(error);
      } else {
        await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
