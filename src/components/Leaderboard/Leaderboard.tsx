import c from "./Leaderboard.module.scss";
import clsx from "clsx";
import LeaderboardEntry from "../LeaderboardEntry";

type LeaderboardProps = {
  headers: string[];
  rows: { name: string; score: number }[];
  className?: string;
} & React.HTMLAttributes<HTMLTableElement>;

const Leaderboard: React.FC<LeaderboardProps> = ({
  headers,
  rows,
  className,
  ...handlers
}) => {
  const sortedRows = [...rows].sort((a, b) => b.score - a.score);

  let lastScore: number | null = null;
  let lastRank = 0;

  const rankedRows = sortedRows.map((row, index) => {
    if (lastScore === row.score) {
      return { ...row, rank: lastRank };
    } else {
      const rank = index + 1;
      lastRank = rank;
      lastScore = row.score;
      return { ...row, rank };
    }
  });
  return (
    <table className={clsx(c.leaderboard, className)} {...handlers}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={c.th}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rankedRows.map((row, rowIndex) => (
          <tr key={rowIndex} className={c.row}>
            <LeaderboardEntry rank={row.rank} name={row.name} />
            <td className={c.td}>{row.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
