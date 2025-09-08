import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import trashIcon from "../../assets/icons/trash.svg";
import Leaderboard from "../../components/Leaderboard";
import LeaderboardEntry from "../../components/LeaderboardEntry";

const TestPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <Button variant="primary">Button with text</Button>
        <Button variant="outlined" icon={trashIcon}>
          Button with icon + text
        </Button>
        <Button variant="secondary" icon={trashIcon} />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <Input placeholder="upiši" />
      </div>
      <div>
        <ProgressBar
          label="Kviz općeg znanja"
          date="petak, 4. 9. 2025."
          percentage={100}
        />
        <ProgressBar
          label="Kviz općeg znanja"
          date={new Date()}
          percentage={70}
          variant="withButtons"
        />
      </div>
      <div>
        <LeaderboardEntry rank={1} name="Pera Perić" />
        <LeaderboardEntry rank={4} name="Mika Mikic" />
        <Leaderboard
          headers={["#", "Ime ekipe", "Broj bodova"]}
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
