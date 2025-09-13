import { formatDate } from "../../dateHelpers";
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
      <div className={c.leaderboard}></div>
    </div>
  );
};

export default QuizCard;
