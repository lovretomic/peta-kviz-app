import { serverTimestamp } from "firebase/firestore";
import { queryClient } from "../queryClient";
import {
  createLeague,
  deleteLeague,
  getLeagues,
  updateLeague,
  type League,
} from "./services/leagueService";
import {
  createQuiz,
  getQuizzes,
  updateQuiz,
  deleteQuiz,
  type Quiz,
} from "./services/quizService";
import {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  type Team,
} from "./services/teamServices";

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
    getAll: (leagueId: string) => getQuizzes(leagueId),
    add: async (quiz: Omit<Quiz, "id">, leagueId: string) => {
      const result = await createQuiz(
        {
          ...quiz,
          updatedAt: serverTimestamp(),
        },
        leagueId
      );
      queryClient.invalidateQueries({ queryKey: ["quizzes", leagueId] });
      return result;
    },
    update: async (quiz: Partial<Quiz>, leagueId: string) => {
      const { id, ...data } = quiz;
      if (!id) throw new Error("ID is required for updating a quiz");

      await updateQuiz(id, { ...data, updatedAt: serverTimestamp() }, leagueId);
      queryClient.invalidateQueries({ queryKey: ["quizzes", leagueId] });
    },
    delete: async (id: string, leagueId: string) => {
      await deleteQuiz(id, leagueId);
      queryClient.invalidateQueries({ queryKey: ["quizzes", leagueId] });
    },
  },
  teams: {
    getAll: (quizId: string, leagueId: string) => getTeams(quizId, leagueId),
    add: async (team: Omit<Team, "id">, quizId: string, leagueId: string) => {
      const result = await createTeam(
        {
          ...team,
          updatedAt: serverTimestamp(),
        },
        quizId,
        leagueId
      );
      queryClient.invalidateQueries({ queryKey: ["teams", quizId, leagueId] });
      return result;
    },
    update: async (team: Partial<Team>, quizId: string, leagueId: string) => {
      const { id, ...data } = team;
      if (!id) throw new Error("ID is required for updating a team");

      await updateTeam(
        id,
        { ...data, updatedAt: serverTimestamp() },
        quizId,
        leagueId
      );
      queryClient.invalidateQueries({ queryKey: ["teams", quizId, leagueId] });
    },
    delete: async (id: string, quizId: string, leagueId: string) => {
      await deleteTeam(id, quizId, leagueId);
      queryClient.invalidateQueries({ queryKey: ["teams", quizId, leagueId] });
    },
  },
};
