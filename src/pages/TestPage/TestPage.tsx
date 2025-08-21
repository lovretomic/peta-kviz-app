import Button from "../../components/Button";
import Input from "../../components/Input";
import trashIcon from "../../assets/icons/trash.svg";
import Table from "../../components/Table";

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
        <Table
          headers={["Header 1", "Header 2", "Header 3"]}
          rows={[
            ["Row 1 Cell 1", "Row 1 Cell 2", "Row 1 Cell 3"],
            ["Row 2 Cell 1", "Row 2 Cell 2", "Row 2 Cell 3"],
            ["Row 3 Cell 1", "Row 3 Cell 2", "Row 3 Cell 3"],
          ]}
        />
      </div>
    </>
  );
};

export default TestPage;
