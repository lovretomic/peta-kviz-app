import c from "./Leaderboard.module.scss";
import clsx from "clsx";

type LeaderboardProps = {
  headers: string[];
  rows: string[][];
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
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={c.cell}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Leaderboard;
