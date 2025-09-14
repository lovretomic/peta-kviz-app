import { formatDate } from "../../dateHelpers";
import Button from "../Button";
import LeaderboardEntry from "../LeaderboardEntry";
import c from "./QuizCard.module.scss";
import KeyboardArrowDownIcon from "../../assets/icons/keyboard-arrow-down.svg?react";
import clsx from "clsx";
import { getRankedRows } from "../../leaderboardHelpers";
import type { LeaderboardRow } from "../Leaderboard/Leaderboard";

export type QuizResults = {
  name: string;
  date: string | Date;
  leaderboard: LeaderboardRow[];
};

type QuizCardProps = {
  quizResults: QuizResults;
  isOpen?: boolean;
  onToggle?: () => void;
};

const QuizCard: React.FC<QuizCardProps> = ({
  quizResults,
  isOpen = false,
  onToggle,
}) => {
  const rankedRows = getRankedRows(quizResults.leaderboard);
  return (
    <div
      className={clsx(c.quizCard, { [c.isOpen]: isOpen })}
      onClick={() => {
        if (!isOpen && onToggle) onToggle();
      }}
    >
      <div className={c.header}>
        <p>{quizResults.name}</p>
        <div className={c.rightWrapper}>
          <p>{formatDate(quizResults.date)}</p>
          <KeyboardArrowDownIcon
            className={clsx(c.icon, { [c.isOpen]: isOpen })}
            onClick={onToggle}
          />
        </div>
      </div>
      <div className={clsx(c.leaderboard, { [c.isOpen]: isOpen })}>
        {rankedRows.map((row) => (
          <LeaderboardEntry key={row.name} name={row.name} rank={row.rank} />
        ))}
        <Button variant="secondary" className={c.button}>
          Pregledaj sve rezultate
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
