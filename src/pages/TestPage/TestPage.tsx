import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import trashIcon from "../../assets/icons/trash.svg";
//import Leaderboard from "../../components/Leaderboard";
//import LeaderboardEntry from "../../components/LeaderboardEntry";
import CodeModal from "../../components/CodeModal";
//import MemberList from "../../components/MemberList";

const TestPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "800px",
        margin: "0 auto",
      }}
    >
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
      <CodeModal isOpen={true} date={new Date()} />
    </div>
  );
};

export default TestPage;
