import { create } from "zustand";
import { useNavigate } from "react-router-dom";

interface Survey {
  id: string;
  user_id: string;
  date: string;
  general_mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}

interface useLocalState {
  weekDates: Date[];
  setWeekDates: (weekDates: Date[]) => void;
  survey: Survey;
  setSurvey: (survey: Survey) => void;
  dashboard: Survey[];
  setDashboard: (dashboard: Survey[], startDate: Date, endDate: Date) => void;
  fetchAndUpdateDashboard: (
    setData: (data: Survey[]) => void,
    startDate?: Date,
    endDate?: Date,
  ) => Promise<void>;
  postSurveyData: (setSurvey: Survey) => Promise<void>;
}

function fillMissingDates(
  data: Survey[],
  startDate: Date,
  endDate: Date,
): Survey[] {
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  let currentDate = new Date(startDate);
  const filledData: Survey[] = [];

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

export const useLocalStore = create<useLocalState>((set) => ({
  survey: {
    id: "",
    user_id: "",
    date: "",
    general_mood: 0,
    activities: 0,
    sleep: 0,
    calmness: 0,
    yourself_time: 0,
  },
  setSurvey: (newSurvey: Survey) => set({ survey: newSurvey }),
  weekDates: [],
  setWeekDates: (newWeekDates: Date[]) => set({ weekDates: newWeekDates }),
  dashboard: [],
  setDashboard: (newDashboard: Survey[], startDate: Date, endDate: Date) => {
    const filledDashboard = fillMissingDates(newDashboard, startDate, endDate);
    set({ dashboard: filledDashboard });
  },
  fetchAndUpdateDashboard: async (
    setData: (data: Survey[]) => void,
    startDate?: Date,
    endDate?: Date,
  ): Promise<void> => {
    if (startDate === undefined || endDate === undefined) {
      return;
    }
    const isoStartDate = startDate && startDate.toISOString();
    const isoEndDate = endDate && endDate.toISOString();
    console.log("startDate", startDate);
    try {
      const response = await fetch(
        `http://localhost:9090/survey?startDate=${isoStartDate}&endDate=${isoEndDate}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (response.status > 299) {
        console.log("err");
      } else {
        console.log("response", response);
        const data = await response.json();
        if (data.length >= 0) {
          console.log("result", data);
          setData(data);
        }
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  },

  postSurveyData: async (survey: Survey) => {
    try {
      const response = await fetch("http://localhost:9090/survey", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          general_mood: survey.general_mood,
          activities: survey.activities,
          sleep: survey.sleep,
          calmness: survey.calmness,
          yourself_time: survey.yourself_time,
          date: new Date().toISOString(),
        }),
      });

      if (response.status > 299) {
        const error = await response.json();
        console.log(error);
        // setStatusMessage(error.error);
        // setError(true);
      } else {
        const message = await response.json();
        console.log(message);
        // setStatusMessage(`Survey ${message} saved to database`);
        // setSubmitted(true);
        // navigate("/user/home");
      }
    } catch (error) {
      // setStatusMessage("An unexpected error occurred.");
      // setError(true);
    }
  },
}));
