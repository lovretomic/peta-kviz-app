import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import trashIcon from "../../assets/icons/trash.svg";
import PillButton from "../../components/PillButton";
import personIcon from "../../assets/icons/person.svg";
import shieldIcon from "../../assets/icons/person-with-shield.svg";

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
          showMessage={true}
        />
        <ProgressBar
          label="Kviz općeg znanja"
          date={new Date()}
          percentage={70}
          variant="withButtons"
        />
      </div>
      <div>
        <PillButton variant="primary" icon={personIcon}>
          Bartholomew Jackson the Fourth
        </PillButton>
        <PillButton variant="captain" icon={shieldIcon}>
          uh
        </PillButton>
      </div>
    </div>
  );
};

export default TestPage;
