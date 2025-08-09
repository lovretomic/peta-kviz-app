import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import trashIcon from "../../assets/icons/trash.svg";

const TestPage = () => {
  return (
    <>
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
          date="petak, 4.9.2025."
          percentage={70}
        />
      </div>
    </>
  );
};

export default TestPage;
