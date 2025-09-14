import { useRef, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";
import type { QuizResults } from "../../components/QuizCard/QuizCard";
import QuizCard from "../../components/QuizCard/QuizCard";
import c from "./QuizzesPage.module.scss";

import SwapVertIcon from "../../assets/icons/swap-vert.svg?react";

const quizResults: QuizResults[] = [
  {
    name: "Kviz 1",
    date: new Date("2024-01-01"),
    leaderboard: ["Ivan Horvat", "Ana Kovač", "Marko Marić"],
  },
  {
    name: "Kviz 2",
    date: new Date("2024-01-02"),
    leaderboard: ["Petar Perić", "Luka Lukić", "Maja Marić"],
  },
  {
    name: "Kviz 3",
    date: new Date("2024-01-03"),
    leaderboard: ["Ivana Ivanković", "Katarina Kovač", "Nikola Novak"],
  },
  {
    name: "Kviz 4",
    date: new Date("2024-01-04"),
    leaderboard: ["Ana Kovač", "Marko Marić", "Ivan Horvat"],
  },
];

const QuizzesPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);
  const [sortingDirection, setSortingDirection] = useState<"asc" | "desc">(
    "asc"
  );

  return (
    <div className={c.page}>
      <div className={c.actionsHeader}>
        <PageWrapper className={c.wrapper}>
          <select name="" id="">
            <option value="">Liga 2024.</option>
            <option value="">Liga 2025.</option>
          </select>
          <button
            onClick={() => {
              setSortingDirection(sortingDirection === "asc" ? "desc" : "asc");
            }}
          >
            <SwapVertIcon className={c.icon} />
            Sortiraj
          </button>
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

        {quizResults
          .sort((a, b) => {
            if (sortingDirection === "asc") {
              return a.date > b.date ? 1 : -1;
            } else {
              return a.date < b.date ? 1 : -1;
            }
          })
          .map((quiz) => (
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
