import "./App.css";
// import { GameState } from "../../types/gameTypes";
import { CreateGuidePage, CreateTravellerPage } from "./pages";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <CreateTravellerPage />
      <CreateGuidePage />
    </div>
  );
}

export default App;
