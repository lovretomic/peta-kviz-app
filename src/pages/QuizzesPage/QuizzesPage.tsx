import { useRef, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import ProgressBar from "../../components/ProgressBar";
import type { QuizResults } from "../../components/QuizCard/QuizCard";
import QuizCard from "../../components/QuizCard/QuizCard";
import c from "./QuizzesPage.module.scss";

import SwapVertIcon from "../../assets/icons/swap-vert.svg?react";
import ActionsHeader from "../../components/ActionsHeader";

const quizResults: QuizResults[] = [
  {
    name: "Kviz 1",
    date: new Date("2024-01-01"),
    leaderboard: [
      { name: "Ana Horvat", score: 85.5 },
      { name: "Marko Markić", score: 78.0 },
      { name: "Ivana Ivić", score: 92.0 },
    ],
  },
  {
    name: "Kviz 2",
    date: new Date("2024-01-02"),
    leaderboard: [
      { name: "Ivan Horvat", score: 85.5 },
      { name: "Ana Kovač", score: 85.5 },
      { name: "Marko Marić", score: 92.0 },
    ],
  },
  {
    name: "Kviz 3",
    date: new Date("2024-01-03"),
    leaderboard: [
      { name: "Ivana Ivanković", score: 85.5 },
      { name: "Katarina Kovač", score: 78.0 },
      { name: "Nikola Novak", score: 92.0 },
    ],
  },
  {
    name: "Kviz 4",
    date: new Date("2024-01-04"),
    leaderboard: [
      { name: "Ana Kovač", score: 85.5 },
      { name: "Marko Marić", score: 78.0 },
      { name: "Ivan Horvat", score: 92.0 },
    ],
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
      <ActionsHeader>
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
      </ActionsHeader>
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
