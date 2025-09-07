import c from "./LeaderboardEntry.module.scss";
import clsx from "clsx";

type LeaderboardEntryProps = {
  rank: number;
  name: string;
};

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ rank, name }) => {
  return rank <= 3 ? (
    <div className={c.row}>
      <span className={clsx(c.rank, c.firstThree)}>{rank}</span>
      <span>{name}</span>
    </div>
  ) : (
    <div className={c.row}>
      <span className={c.rank}>{rank}</span>
      <span>{name}</span>
    </div>
  );
};

export default LeaderboardEntry;
