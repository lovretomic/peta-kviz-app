import c from "./LeaderboardEntry.module.scss";
import clsx from "clsx";

type LeaderboardEntryProps = {
  rank: number;
  name: string;
};

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({ rank, name }) => {
  const isTopThree = rank <= 3;
  return (
    <>
      <td className={clsx(c.rank, { [c.firstThree]: isTopThree })}>{rank}</td>
      <td className={c.name}>{name}</td>
    </>
  );
};

export default LeaderboardEntry;
