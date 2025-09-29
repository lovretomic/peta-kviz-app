import { queryClient } from "../queryClient";
import {
  createLeague,
  deleteLeague,
  getLeagues,
  updateLeague,
  type League,
} from "./services/leagueService";

export const db = {
  leagues: {
    getAll: () => getLeagues(),
    add: async (league: Omit<League, "id">) => {
      const result = await createLeague(league);
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
      return result;
    },
    update: async (id: string, league: Partial<League>) => {
      await updateLeague(id, league);
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
    delete: async (id: string) => {
      await deleteLeague(id);
      queryClient.invalidateQueries({ queryKey: ["leagues"] });
    },
  },
};
