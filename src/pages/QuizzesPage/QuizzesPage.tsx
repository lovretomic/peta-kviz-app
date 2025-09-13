import { useRef, useState } from "react";
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
  {
    name: "Kviz 4",
    date: new Date(),
    leaderboard: ["Ana Kovač", "Marko Marić", "Ivan Horvat"],
  },
];

const QuizzesPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);

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
        <ProgressBar
          label="Kviz općeg znanja"
          percentage={45}
          date={new Date()}
          buttonLabel="Pregledaj prijavu"
          buttonVariant="secondary"
        />

        {quizResults.map((quiz) => (
          <QuizCard
            key={quiz.name}
            quizResults={quiz}
            isOpen={expandedQuiz === quiz.name}
            onToggle={() => {
              setExpandedQuiz(expandedQuiz === quiz.name ? null : quiz.name);
            }}
          />
        ))}
      </PageWrapper>
    </div>
  );
};

export default QuizzesPage;
