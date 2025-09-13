import { formatDate } from "../../dateHelpers";
import Button from "../Button";
import LeaderboardEntry from "../LeaderboardEntry";
import c from "./QuizCard.module.scss";
import KeyboardArrowDownIcon from "../../assets/icons/keyboard-arrow-down.svg?react";

export type QuizResults = {
  name: string;
  date: string | Date;
  leaderboard: string[];
};

type QuizCardProps = {
  quizResults: QuizResults;
};

const QuizCard: React.FC<QuizCardProps> = ({ quizResults }) => {
  return (
    <div className={c.quizCard}>
      <div className={c.header}>
        <p>{quizResults.name}</p>
        <div className={c.rightWrapper}>
          <p>{formatDate(quizResults.date)}</p>
          <KeyboardArrowDownIcon className={c.icon} />
        </div>
      </div>
      <div className={c.leaderboard}>
        {quizResults.leaderboard.map((name, index) => (
          <LeaderboardEntry key={index} name={name} rank={index + 1} />
        ))}
      </div>
      <Button variant="secondary">Pregledaj sve rezultate</Button>
    </div>
  );
};

export default QuizCard;
