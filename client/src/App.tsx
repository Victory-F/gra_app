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
import {
  BlueLightText,
  Button,
  Description,
  PreviewWrapper,
  Text,
  Title,
} from "./styled";
import { Modal } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Logo
        title="Home"
        onClick={() => {
          navigate("/");
        }}
      >
        GRA
      </Logo>
      <Info onClick={() => setOpen(true)}>ⓘ</Info>
      <Modal open={open} onClose={() => setOpen(false)}>
        <InfoWrapper>
          <CloseButton onClick={() => setOpen(false)}>X</CloseButton>
          <Title> GRA</Title>
          <Text style={{ fontSize: "1.3vw" }}>
            Create a story. Share the code with your friends. Dive into the
            fantasy you created.{" "}
          </Text>
          <InfoPartsContainer>
            <InfoPartsWrapper>
              <InfoPart>
                <BlueLightText>What you need to play</BlueLightText>
                <InfoDescription>
                  • Imagination.
                  <InfoDescription>• 2-7 people.</InfoDescription>
                  <InfoDescription>
                    • All in same room or same video call.
                  </InfoDescription>
                  <InfoDescription>
                    • Each has their own computer.
                  </InfoDescription>
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>Guide</BlueLightText>
                <InfoDescription>
                  The game has to have one guide. Guide creates their character
                  and the game.
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>Traveller</BlueLightText>
                <InfoDescription>
                  The game has to have at least one Traveller. Traveller creates
                  their character and joins the game.
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>Game Flow</BlueLightText>
                <InfoDescription>
                  The Guide leads the Travellers through the story. It may be
                  anything, anything created by the Guide’s imagination. The
                  Guide tells the story, switches the locations, sets the tasks
                  or just wants Travellers to figure everything out by
                  themselves. The Guide may increase or decrease Traveller’s
                  points, reveal secrets to one/several Travellers or to them
                  all. Travellers win the Game if they passed all the Locations
                  and at least one of them has at least 1 point at the end.
                  Travellers lose the game if all of them have 0 points at any
                  point of the game.
                </InfoDescription>
              </InfoPart>
            </InfoPartsWrapper>
            <InfoPartsWrapper>
              <InfoPart>
                <BlueLightText>Location</BlueLightText>
                <InfoDescription>
                  The game has to have at least one Location. The Locations will
                  be displayed on the screen in the order they were created. To
                  go to the next location press CONTINUE.
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>Encounter</BlueLightText>
                <InfoDescription>
                  Every location may have an encounter. Every encounter may have
                  a secret which is visible only to a guide at the beginning.
                  The Guide may reveal the secret to one/several Travellers or
                  to all of them at the same time during the game.
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>End Game Cases</BlueLightText>
                <InfoDescription>
                  The game has to have Win Case and Lose Case.
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>Win Case</BlueLightText>
                <InfoDescription>
                  Travellers win and see Win Case created by the guide if at
                  least one has more than 0 points after the last location.
                </InfoDescription>
              </InfoPart>

              <InfoPart>
                <BlueLightText>Lose Case</BlueLightText>
                <InfoDescription>
                  Travellers lose and see Lose Case created by the Guide if all
                  the Travellers have 0 points at any moment of the game.
                </InfoDescription>
              </InfoPart>
            </InfoPartsWrapper>
          </InfoPartsContainer>
          <Title>Have Fun!</Title>
        </InfoWrapper>
      </Modal>
      <Video className="videoTag" autoPlay loop muted>
        <source src="portal.mp4" type="video/mp4" />
      </Video>
      <AppContainer>
        <br />
        <Routes>
          <Route path="/" element={<HomePage setMessage={setMessage} />} />
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
  font-family: "Varela Round", sans-serif;
`;

const Video = styled.video`
  position: fixed;
  top: 0;
  min-width: 100vw;
  min-height: 100vh;
  z-index: -1;
`;
const Logo = styled.button`
  font-family: "Varela Round", sans-serif;
  background: none;
  border: none;
  color: white;
  position: absolute;
  font-size: 3vw;
  padding: 1vw;
  text-shadow: 0 0 0.8vw #ffa791, 0 0 1vw #ffa791, 0 0 1.3vw #ffa791;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 0.8vw #ffcccc, 0 0 1vw #ffcccc, 0 0 1.3vw #ffcccc;
  }
`;

const Message = styled(Text)`
  position: fixed;
  top: 95vh;
  color: white;
  left: 0.7vw;
  font-size: 1.2vw;
`;
const Info = styled(Logo)`
  left: 95vw;
  font-size: 2.5vw;
  padding: 0.9vw;
`;
const InfoWrapper = styled(PreviewWrapper)`
  font-family: "Varela Round", sans-serif;
  margin: 6vw;
  flex-direction: column;
  text-align: start;
  color: white;
  gap: 1vw;
  background: rgba(0, 0, 0, 0.8);
`;
const InfoPart = styled.div`
  display: flex;
  flex-direction: column;
  text-align: start;
  gap: 0.5vw;
`;
const InfoPartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
  width: 45%;
`;
const InfoPartsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
const InfoDescription = styled(Description)`
  text-align: start;
  text-align: justify;
`;
const CloseButton = styled(Button)`
  font-size: 0.7vw;
  position: absolute;
  margin: 0;
  top: 11.3%;
  left: 95%;
  border: 0.1vw solid white;
  border-radius: 1%;
`;
