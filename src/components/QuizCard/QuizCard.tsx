import { formatDate } from "../../dateHelpers";
import LeaderboardEntry from "../LeaderboardEntry";
import c from "./QuizCard.module.scss";

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
        </div>
      </div>
      <div className={c.leaderboard}>
        {quizResults.leaderboard.map((name, index) => (
          <LeaderboardEntry key={index} name={name} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
