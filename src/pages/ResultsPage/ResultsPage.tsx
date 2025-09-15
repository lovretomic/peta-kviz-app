import ActionsHeader from "../../components/ActionsHeader";
import Leaderboard from "../../components/Leaderboard";
import type { LeaderboardRow } from "../../components/Leaderboard/Leaderboard";
import PageWrapper from "../../components/PageWrapper";
import Select from "../../components/Select";

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
        <Select
          placeholder="Odaberi ligu"
          options={[
            { value: "liga-2024", label: "Liga 2024." },
            { value: "liga-2025", label: "Liga 2025." },
          ]}
        />
        <Select
          placeholder="Odaberi kviz"
          options={[
            { value: "rezultati-lige", label: "Rezultati lige" },
            {
              value: "kviz-19-4-2025",
              label: "Kviz općeg znanja (19. 4. 2025.)",
            },
          ]}
        />
      </ActionsHeader>
      <PageWrapper className={c.pageWrapper}>
        <Leaderboard rows={rows} className={c.leaderboard} />
      </PageWrapper>
    </div>
  );
};

export default ResultsPage;
