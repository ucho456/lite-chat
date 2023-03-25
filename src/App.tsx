import { Add } from "@mui/icons-material";
import "./App.scss";
import Chat from "./components/chat/Chat";
import Overview from "./components/overview/Overview";

function App() {
  return (
    <div className="App">
      <h1>Lite chat</h1>
      <Add />
      <Chat />
      <Overview />
    </div>
  );
}

export default App;
