import { Route, Routes } from "react-router-dom";
import "./App.css";
// import { GameState } from "../../types/gameTypes";
import {
  HomePage,
  CreateGuidePage,
  CreateLocationPage,
  CreateTravellerPage,
  CreateGameNamePage,
  StartGamePage,
} from "./pages";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-guide" element={<CreateGuidePage />} />
        <Route path="/create-location" element={<CreateLocationPage />} />
        <Route path="/create-traveller" element={<CreateTravellerPage />} />
        <Route path="/create-game-name" element={<CreateGameNamePage />} />
        <Route path="/start-game" element={<StartGamePage />} />
      </Routes>
    </div>
  );
}

export default App;
