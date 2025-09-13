import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";
import type { QuizResults } from "../../components/QuizCard/QuizCard";
import QuizCard from "../../components/QuizCard/QuizCard";
import c from "./QuizzesPage.module.scss";

const quizResults: QuizResults[] = [
  {
    name: "Kviz 1",
    date: new Date(),
    leaderboard: ["Ivan Horvat", "Ana Kovač", "Marko Marić"],
  },
  {
    name: "Kviz 2",
    date: new Date(),
    leaderboard: ["Petar Perić", "Luka Lukić", "Maja Marić"],
  },
];

const QuizzesPage = () => {
  return (
    <>
      <div className={c.actionsHeader}>
        <PageWrapper className={c.wrapper}>
          <select name="" id="">
            <option value="">Liga 2024.</option>
            <option value="">Liga 2025.</option>
          </select>
          <button>Sortiraj</button>
        </PageWrapper>
      </div>
      <PageWrapper className={c.pageWrapper}>
        <div className={c.quizList}>
          {quizResults.map((quiz) => (
            <QuizCard key={quiz.name} quizResults={quiz} />
          ))}
        </div>
        <ProgressBar
          label="Loading..."
          percentage={45}
          date={new Date()}
          buttonLabel="Pregledaj prijavu"
          buttonVariant="secondary"
        />
      </PageWrapper>
    </>
  );
};

export default QuizzesPage;
