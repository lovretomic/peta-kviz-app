import Leaderboard from "../../components/Leaderboard";
import LeaderboardEntry from "../../components/LeaderboardEntry";

const TestPage = () => {
  return (
    <div>
      <div
        style={{
          height: "200px",
          width: "600px",
          margin: "0 auto",
          marginTop: "50px",
        }}
      >
        <LeaderboardEntry rank={1} name="Pera Perić" />
        <LeaderboardEntry rank={4} name="Mika Mikic" />
        <Leaderboard
          rows={[
            { name: "Row 3 Cell 2", score: 3 },
            { name: "Row 1 Cell 2", score: 60 },
            { name: "Row 2 Cell 2", score: 20.5 },
            { name: "Row 3 Cell 2", score: 10 },
            { name: "Row 3 Cell 2", score: 5 },
            { name: "Row 3 Cell 2", score: 5 },
            { name: "Row 3 Cell 2", score: 2 },
            { name: "Row 3 Cell 2", score: 1 },
          ]}
        />
      </div>
    </div>
  );
};

export default TestPage;
