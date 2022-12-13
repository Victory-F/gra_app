import "./App.css";
// import { GameState } from "../../types/gameTypes";
import {
  CreateGuidePage,
  CreateLocationPage,
  CreateTravellerPage,
} from "./pages";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <CreateTravellerPage />
      <CreateGuidePage />
      <CreateLocationPage />
    </div>
  );
}

export default App;
