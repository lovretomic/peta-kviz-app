import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import trashIcon from "./assets/icons/trash.svg";

function App() {
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
    </>
  );
}

export default App;
