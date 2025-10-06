import { serverTimestamp } from "firebase/firestore";
import { queryClient } from "../queryClient";
import {
  createLeague,
  deleteLeague,
  getLeagues,
  updateLeague,
  type League,
} from "./services/leagueService";
import { getQuizzes, type Quiz } from "./services/quizService";

export const db = {
  leagues: {
    getAll: () => getLeagues(),
    add: async (league: Omit<League, "id">) => {
      const result = await createLeague({
        ...league,
        updatedAt: serverTimestamp(),
      });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
      return result;
    },
    update: async (league: Partial<League>) => {
      const { id, ...data } = league;
      if (!id) throw new Error("ID is required for updating a league");

      await updateLeague(id, { ...data, updatedAt: serverTimestamp() });
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
    delete: async (id: string) => {
      await deleteLeague(id);
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  },
  quizzes: {
    getAll: () => getQuizzes(),
    add: async (quiz: Omit<Quiz, "id">) => {
      const result = await createQuiz({
        ...quiz,
        updatedAt: serverTimestamp(),
      });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      return result;
    },
  },
};
