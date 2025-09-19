import Button from "../../components/Button";
import Input from "../../components/Input";
import ProgressBar from "../../components/ProgressBar";
import TrashIcon from "../../assets/icons/trash.svg";
import CodeModal from "../../components/CodeModal";

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
        <Button variant="outlined" icon={TrashIcon}>
          Button with icon + text
        </Button>
        <Button variant="secondary" icon={TrashIcon} />
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
        />
      </div>
      <CodeModal isOpen={false} date={new Date()} />
    </div>
  );
};

export default TestPage;
