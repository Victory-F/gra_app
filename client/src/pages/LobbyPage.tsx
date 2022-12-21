import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

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
      <h1>Name of The Game: {lobby.gameName && lobby.gameName}</h1>
      <h2>Code: {lobby.gameId && lobby.gameId}</h2>
      <h3>Guide: {lobby.guideName && lobby.guideName}</h3>
      <h4>Travellers:</h4>
      {lobby.travellersNames &&
        lobby.travellersNames.length !== 0 &&
        lobby.travellersNames.map((t) => (
          <div>
            <h2 key={t.id}>{t.name}</h2>
            {isGuide && (
              <button
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
              </button>
            )}
          </div>
        ))}
      {isGuide &&
      lobby.travellersNames &&
      lobby.travellersNames.length !== 0 ? (
        <button
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
        </button>
      ) : (
        "Wait for players to join"
      )}
    </div>
  );
};
export { LobbyPage };
