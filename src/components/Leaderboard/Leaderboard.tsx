import c from "./Leaderboard.module.scss";
import clsx from "clsx";
import LeaderboardEntry from "../LeaderboardEntry";

type LeaderboardProps = {
  headers: string[];
  rows: { rank: number; name: string; score: number }[];
  className?: string;
} & React.HTMLAttributes<HTMLTableElement>;

const Leaderboard: React.FC<LeaderboardProps> = ({
  headers,
  rows,
  className,
  ...handlers
}) => {
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
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={c.row}>
            <td className={c.td} colSpan={2}>
              <LeaderboardEntry rank={row.rank} name={row.name} />
            </td>
            <td className={c.td}>{row.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
