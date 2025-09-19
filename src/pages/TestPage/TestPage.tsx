import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import trashIcon from "../../assets/icons/trash.svg";
//import Leaderboard from "../../components/Leaderboard";
//import LeaderboardEntry from "../../components/LeaderboardEntry";
import { useState } from "react";
import CodeModal from "../../components/CodeModal";
//import MemberList from "../../components/MemberList";

const TestPage = () => {
  const [formData, setFormData] = useState({
    teamName: "Moja ekipa",
    captainName: "Mak Terbovc",
    captainEmail: "example@example.com",
    members: ["Sahu mra", "Lovre Thomic"],
  });

  function addMember(name: string) {
    setFormData((prevData) => ({
      ...prevData,
      members: [...prevData.members, name],
    }));
  }

  function removeMember(name: string) {
    setFormData((prevData) => ({
      ...prevData,
      members: prevData.members.filter((member) => member !== name),
    }));
  }

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
      <CodeModal isOpen={true} setIsOpen={() => {}} date={new Date()} />
    </div>
  );
};

export default TestPage;
