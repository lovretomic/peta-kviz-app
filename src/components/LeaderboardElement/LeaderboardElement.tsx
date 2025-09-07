import c from "./LeaderboardElement.module.scss";
import clsx from "clsx";

type LeaderboardElementProps = {
  rank: number;
  name: string;
};

const LeaderboardElement: React.FC<LeaderboardElementProps> = ({
  rank,
  name,
}) => {
  return rank <= 3 ? (
    <div className={clsx(c.element, c.firstThree)}>
      <span className={c.rank}>{rank}.</span>
      <span className={c.name}>{name}</span>
    </div>
  ) : (
    <div className={c.element}>
      <span className={c.rank}>{rank}.</span>
      <span className={c.name}>{name}</span>
    </div>
  );
};

export default LeaderboardElement;
