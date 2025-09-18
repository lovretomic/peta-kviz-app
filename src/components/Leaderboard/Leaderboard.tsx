import c from "./Leaderboard.module.scss";
import clsx from "clsx";
import LeaderboardEntry from "../LeaderboardEntry";
import { getRankedRows } from "../../leaderboardHelpers";

export type LeaderboardRow = {
  name: string;
  score: number;
};

type LeaderboardProps = {
  rows: LeaderboardRow[];
  className?: string;
} & React.HTMLAttributes<HTMLTableElement>;

const Leaderboard: React.FC<LeaderboardProps> = ({
  rows,
  className,
  ...handlers
}) => {
  const rankedRows = getRankedRows(rows);

  return (
    <div className={c.leaderboardContainer}>
      <table className={clsx(c.leaderboard, className)} {...handlers}>
        <thead>
          <tr>
            <th>
              <div className={c.team}>
                <div className={c.rank}>#</div>
                <div className={c.name}>Ime ekipe</div>
              </div>
            </th>
            <th className={c.score}>Broj bodova</th>
          </tr>
        </thead>
        <tbody>
          {rankedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className={c.playerTd}>
                <LeaderboardEntry rank={row.rank} name={row.name} />
              </td>
              <td className={c.score}>
                {row.score.toString().replace(".", ",")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
