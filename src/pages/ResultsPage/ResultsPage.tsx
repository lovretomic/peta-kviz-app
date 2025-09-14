import ActionsHeader from "../../components/ActionsHeader";
import Leaderboard from "../../components/Leaderboard";
import type { LeaderboardRow } from "../../components/Leaderboard/Leaderboard";
import PageWrapper from "../../components/PageWrapper";

import c from "./ResultsPage.module.scss";

const rows: LeaderboardRow[] = [
  { name: "Ekipa A", score: 85.5 },
  { name: "Ekipa B", score: 78.0 },
  { name: "Ekipa C", score: 92.0 },
  { name: "Ekipa D", score: 78.0 },
  { name: "Ekipa E", score: 88.5 },
  { name: "Ekipa F", score: 92.0 },
  { name: "Ekipa G", score: 70.0 },
  { name: "Ekipa H", score: 85.5 },
  { name: "Ekipa I", score: 60.0 },
  { name: "Ekipa J", score: 78.0 },
  { name: "Ekipa K", score: 88.5 },
  { name: "Ekipa L", score: 92.0 },
  { name: "Ekipa M", score: 70.0 },
];

const ResultsPage = () => {
  return (
    <div className={c.page}>
      <ActionsHeader>
        <select name="" id="">
          <option value="">Liga 2024.</option>
          <option value="">Liga 2025.</option>
        </select>
        <select name="" id="">
          <option value="">Rezultati lige</option>
          <option value="">Kviz općeg znanja (19. 4. 2025.)</option>
          <option value="">Kviz općeg znanja (19. 5. 2025.)</option>
          <option value="">Kviz općeg znanja (19. 6. 2025.)</option>
        </select>
      </ActionsHeader>
      <PageWrapper className={c.pageWrapper}>
        <Leaderboard rows={rows} className={c.leaderboard} />
      </PageWrapper>
    </div>
  );
};

export default ResultsPage;
