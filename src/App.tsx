import "./App.css";
import Button from "./components/Button";
import trashIcon from './assets/icons/trash.svg';

function App() {
  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="white">Button with text</Button>
        <Button variant="default" icon={trashIcon}>Button with icon + text</Button>
        <Button variant="default" icon={trashIcon} />  {/* icon only button */}
      </div>
    </>
  );
}

export default App;
