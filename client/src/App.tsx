import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  HomePage,
  CreateGuidePage,
  CreateLocationPage,
  CreateTravellerPage,
  CreateGameNamePage,
  LobbyPage,
  GamePage,
} from "./pages";

function App() {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);
  useEffect(() => {
    window.onpopstate = () => {
      setPressed(true);
    };
    if (pressed) {
      navigate("/");
      setPressed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [message, setMessage] = useState<string>("");

  return (
    <div className="App">
      <p>Message:{message}</p>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/create-guide"
          element={<CreateGuidePage setMessage={setMessage} />}
        />
        <Route
          path="/create-location"
          element={<CreateLocationPage setMessage={setMessage} />}
        />
        <Route path="/create-traveller" element={<CreateTravellerPage />} />
        <Route path="/create-game-name" element={<CreateGameNamePage />} />
        <Route path="/start-game" element={<LobbyPage />} />
        <Route path="/play-game" element={<GamePage />} />
      </Routes>
    </div>
  );
}

export default App;
