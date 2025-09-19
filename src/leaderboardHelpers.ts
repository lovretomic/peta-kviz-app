import type { LeaderboardRow } from "./components/Leaderboard/Leaderboard";

export function getRankedRows(rows: LeaderboardRow[]) {
  const sortedRows = [...rows].sort((a, b) => b.score - a.score);

  let lastScore: number | null = null;
  let lastRank = 0;

  return sortedRows.map((row, index) => {
    if (lastScore === row.score) {
      return { ...row, rank: lastRank };
    } else {
      const rank = index + 1;
      lastRank = rank;
      lastScore = row.score;
      return { ...row, rank };
    }
  });
}
