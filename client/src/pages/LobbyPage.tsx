import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styled from "styled-components";
import { Lobby } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Button, Name, Text, Title } from "../styled";

const LobbyPage = () => {
  const navigate = useNavigate();

  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const isGuide: boolean = game
    ? localStorage.getItem("token") === localStorage.getItem("player")
    : false;

  const [lobby, setLobby] = useState<Lobby>({
    gameId: "",
    gameName: "",
    guideName: "",
    travellersNames: [],
  });

  useEffect(() => {
    !game && navigate("/");
    socket.emit(
      "send-lobby",
      localStorage.getItem("token"),
      localStorage.getItem("player"),
      false
    );

    socket.on("get-lobby", (lobby: Lobby, started: boolean) => {
      if (
        !isGuide &&
        !lobby.travellersNames.find(
          (t) => t.id === localStorage.getItem("player")
        )
      ) {
        navigate("/");
      }
      setLobby(lobby);
      started && navigate("/play-game");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LobbyContainer>
      <Title>{lobby.gameName && lobby.gameName}</Title>

      <GuideCodeContainer>
        <Name style={{ padding: "1.5vw" }}>
          {lobby.guideName && lobby.guideName}
        </Name>
        <Code>🔮 {lobby.gameId && lobby.gameId}</Code>
      </GuideCodeContainer>

      {lobby.travellersNames &&
        lobby.travellersNames.length !== 0 &&
        lobby.travellersNames.map((t) => (
          <TravellerContainer style={!isGuide ? { textAlign: "center" } : {}}>
            <Name style={{ padding: "1.5vw" }} key={t.id}>
              {t.name}
            </Name>
            {isGuide ? (
              <Button
                style={{ fontSize: "0.6vw", margin: "1.5vw" }}
                onClick={() => {
                  socket.emit("delete-traveller", lobby.gameId, t.id);
                  socket.emit(
                    "send-lobby",
                    localStorage.getItem("token"),
                    localStorage.getItem("player"),
                    false
                  );
                }}
              >
                X
              </Button>
            ) : (
              <Icon>⭑</Icon>
            )}
          </TravellerContainer>
        ))}
      {isGuide &&
      lobby.travellersNames &&
      lobby.travellersNames.length !== 0 ? (
        <Button
          style={{ margin: "0", width: "50%" }}
          onClick={() => {
            socket.emit(
              "send-lobby",
              lobby.gameId,
              localStorage.getItem("player"),
              true
            );
          }}
        >
          PLAY
        </Button>
      ) : isGuide ? (
        <Text>Share the code to start playing</Text>
      ) : (
        <Text>Waiting for {lobby.guideName} to start the game...</Text>
      )}
    </LobbyContainer>
  );
};
export { LobbyPage };

const TravellerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border: 0.1vw solid white;
  box-shadow: 0 0 0.8vw #d9555f, 0 0 1vw #d9555f, inset 0 0 1.3vw #d9555f;
  color: white;
  margin: 0.5vw;
`;
const LobbyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6.5vw;
  margin-left: 10vw;
  gap: 1.3vw;
  width: 30%;
`;
const Code = styled.p`
  font-size: 1.5vw;
  padding-right: 1.5vw;
  text-shadow: 0 0 0.9vw purple, 0 0 3vw purple, 0 0 2vw purple;
`;

const GuideCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.4vw;
  border: 0.1vw solid white;
  box-shadow: 0 0 0.8vw purple, 0 0 1vw purple, inset 0 0 1.3vw purple;
  color: white;
  margin: 0.5vw;
`;

const Icon = styled(Title)`
  padding: 1.3vw;
`;
