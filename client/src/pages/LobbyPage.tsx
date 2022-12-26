import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Button, Title } from "../styled";

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
    <div>
      <Title>{lobby.gameName && lobby.gameName}</Title>
      <Title>Code: {lobby.gameId && lobby.gameId}</Title>
      <Title>Guide: {lobby.guideName && lobby.guideName}</Title>
      <h4>Travellers:</h4>
      {lobby.travellersNames &&
        lobby.travellersNames.length !== 0 &&
        lobby.travellersNames.map((t) => (
          <div>
            <h2 key={t.id}>{t.name}</h2>
            {isGuide && (
              <Button
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
                delete
              </Button>
            )}
          </div>
        ))}
      {isGuide &&
      lobby.travellersNames &&
      lobby.travellersNames.length !== 0 ? (
        <Button
          onClick={() => {
            socket.emit(
              "send-lobby",
              lobby.gameId,
              localStorage.getItem("player"),
              true
            );
          }}
        >
          Let's play!
        </Button>
      ) : (
        "Wait for players to join"
      )}
    </div>
  );
};
export { LobbyPage };
