import { formatDate } from "../../dateHelpers";
import Button from "../Button";
import LeaderboardEntry from "../LeaderboardEntry";
import c from "./QuizCard.module.scss";
import KeyboardArrowDownIcon from "../../assets/icons/keyboard-arrow-down.svg?react";
import clsx from "clsx";

export type QuizResults = {
  name: string;
  date: string | Date;
  leaderboard: string[];
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
  return (
    <div className={c.quizCard}>
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
        {quizResults.leaderboard.map((name, index) => (
          <LeaderboardEntry key={index} name={name} rank={index + 1} />
        ))}
        <Button variant="secondary" className={c.button}>
          Pregledaj sve rezultate
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
