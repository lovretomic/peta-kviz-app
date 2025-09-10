import c from "./LeaderboardEntry.module.scss";
import clsx from "clsx";

type LeaderboardEntryProps = {
  rank: number;
  name: string;
  render?: "rank" | "name";
};

const LeaderboardEntry: React.FC<LeaderboardEntryProps> = ({
  rank,
  name,
  render,
}) => {
  const isTopThree = rank <= 3;
  return (
    <>
      {render === "rank" && (
        <div className={clsx(c.rank, { [c.firstThree]: isTopThree })}>
          {rank}
        </div>
      )}

      {render === "name" && <div className={c.name}>{name}</div>}

      {!render && (
        <div className={c.row}>
          <div className={clsx(c.rank, { [c.firstThree]: isTopThree })}>
            {rank}
          </div>
          <div className={c.name}>{name}</div>
        </div>
      )}
    </>
  );
};

export default LeaderboardEntry;
