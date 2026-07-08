import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { surveysApi } from "../api/surveys";

export interface Survey {
  id: number;
  username: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  url: string;
  date: string;
  interests: {
    students: boolean;
    location: boolean;
    campus: boolean;
    atmosphere: boolean;
    dormRooms: boolean;
    sports: boolean;
  };
  heardFrom: string;
  gradMonth: string;
  gradYear: string;
  recommendation: string;
}

interface SurveyContextType {
  surveys: Survey[];
  isLoading: boolean;
  error: string | null;
  refreshSurveys: () => Promise<void>;
  addSurvey: (survey: Omit<Survey, "id">) => Promise<Survey>;
  updateSurvey: (id: number, survey: Omit<Survey, "id">) => Promise<Survey>;
  deleteSurvey: (id: number) => Promise<void>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSurveys = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await surveysApi.get<Survey[]>("/surveys");
      setSurveys(response.data);
    } catch {
      setError("Unable to load surveys. Please verify the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshSurveys();
  }, []);

  const addSurvey = async (survey: Omit<Survey, "id">) => {
    try {
      const response = await surveysApi.post<Survey>("/surveys", survey);
      setError(null);
      setSurveys((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError("Unable to create survey");
      throw err;
    }
  };

  const updateSurvey = async (id: number, survey: Omit<Survey, "id">) => {
    try {
      const response = await surveysApi.put<Survey>(`/surveys/${id}`, survey);
      setError(null);
      setSurveys((prev) => prev.map((s) => (s.id === id ? response.data : s)));
      return response.data;
    } catch (err) {
      setError("Unable to update survey.");
      throw err;
    }
  };

  const deleteSurvey = async (id: number) => {
    try {
      await surveysApi.delete(`/surveys/${id}`);
      setError(null);
      setSurveys((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError("Unable to delete survey.");
      throw err;
    }
  };

  return (
    <SurveyContext.Provider
      value={{ surveys, isLoading, error, refreshSurveys, addSurvey, updateSurvey, deleteSurvey }}
    >
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurveys() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurveys must be used within a SurveyProvider");
  }
  return context;
}
