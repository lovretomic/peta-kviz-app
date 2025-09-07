import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import trashIcon from "../../assets/icons/trash.svg";
import Table from "../../components/Table";
import LeaderboardElement from "../../components/LeaderboardElement";

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
        <LeaderboardElement rank={1} name="Pera Perić" />
        <LeaderboardElement rank={4} name="Mika Mikic" />
        <Table
          headers={["#", "Ime ekipe", "Broj bodova"]}
          rows={[
            ["Row 1 Cell 1", "Row 1 Cell 2", "Row 1 Cell 3"],
            ["Row 2 Cell 1", "Row 2 Cell 2", "Row 2 Cell 3"],
            ["Row 3 Cell 1", "Row 3 Cell 2", "Row 3 Cell 3"],
          ]}
        />
      </div>
    </div>
  );
};

export default TestPage;
