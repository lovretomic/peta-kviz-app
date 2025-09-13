import { useEffect, useRef } from "react";
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
  {
    name: "Kviz 3",
    date: new Date(),
    leaderboard: ["Ivana Ivanković", "Katarina Kovač", "Nikola Novak"],
  },
];

const QuizzesPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = wrapperRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, []);

  return (
    <div className={c.page}>
      <div className={c.actionsHeader}>
        <PageWrapper className={c.wrapper}>
          <select name="" id="">
            <option value="">Liga 2024.</option>
            <option value="">Liga 2025.</option>
          </select>
          <button>Sortiraj</button>
        </PageWrapper>
      </div>
      <PageWrapper className={c.pageWrapper} ref={wrapperRef}>
        {quizResults.map((quiz) => (
          <QuizCard key={quiz.name} quizResults={quiz} />
        ))}

        <ProgressBar
          label="Loading..."
          percentage={45}
          date={new Date()}
          buttonLabel="Pregledaj prijavu"
          buttonVariant="secondary"
        />
      </PageWrapper>
    </div>
  );
};

export default QuizzesPage;
