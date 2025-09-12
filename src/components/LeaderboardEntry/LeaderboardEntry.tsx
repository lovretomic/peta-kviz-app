import c from "./LeaderboardEntry.module.scss";
import clsx from "clsx";

type LeaderboardEntryProps = {
  rank: number;
  name: string;
};

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ rank, name }) => {
  const isTopThree = rank <= 3;
  return (
    <div className={c.row}>
      <div className={clsx(c.rank, { [c.firstThree]: isTopThree })}>{rank}</div>
      <div>{name}</div>
    </div>
  );
};

export default LeaderboardEntry;
