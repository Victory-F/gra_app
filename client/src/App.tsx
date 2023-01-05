import { useState } from "react";
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
  EndGamePage,
  CreateEndGameCasesPage,
} from "./pages";

import styled from "styled-components";

function App() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  return (
    <div>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        GRA
      </Logo>
      <Video className="videoTag" autoPlay loop muted>
        <source src="portal.mp4" type="video/mp4" />
      </Video>
      <AppContainer>
        <br />
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
          <Route
            path="/create-endgame-cases"
            element={<CreateEndGameCasesPage setMessage={setMessage} />}
          />
          <Route
            path="/create-traveller"
            element={<CreateTravellerPage setMessage={setMessage} />}
          />
          <Route
            path="/create-game-name"
            element={<CreateGameNamePage setMessage={setMessage} />}
          />
          <Route path="/start-game" element={<LobbyPage />} />
          <Route path="/play-game" element={<GamePage />} />
          <Route path="/end-game" element={<EndGamePage />} />
        </Routes>
      </AppContainer>
      <Message>{message}</Message>
    </div>
  );
}

export default App;
const AppContainer = styled.div`
  color: #fff5e7;
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  color: white;
`;

const Video = styled.video`
  position: fixed;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -3;
`;
const Logo = styled.button`
  background: none;
  border: none;
  color: white;
  position: absolute;
  font-size: 3vw;
  padding: 1vw;
  text-shadow: 0 0 0.8vw #4f86f7, 0 0 1vw #4f86f7, 0 0 1.3vw #4f86f7;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 0.8vw #ffd12a, 0 0 1vw #ffd12a, 0 0 1.3vw #ffd12a;
  }
`;

const Message = styled.p`
  position: fixed;
  top: 93vh;
  color: white;
`;
