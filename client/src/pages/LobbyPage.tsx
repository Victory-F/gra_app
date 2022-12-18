import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const LobbyPage = () => {
  const navigate = useNavigate();

  const isGuide: boolean =
    localStorage.getItem("player") === localStorage.getItem("token");

  const [lobby, setLobby] = useState<Lobby>({
    gameId: "",
    gameName: "",
    guideName: "",
    travellersNames: [],
  });

  useEffect(() => {
    socket.emit("send-lobby", localStorage.getItem("token"), false);
    socket.on("get-lobby", (lobby: Lobby, started: boolean) => {
      setLobby(lobby);
      started && navigate("/play-game");
    });
  }, [navigate]);

  return (
    <div>
      <h1>Name of The Game: {lobby.gameName && lobby.gameName}</h1>
      <h2>Code: {lobby.gameId && lobby.gameId}</h2>
      <h3>Guide: {lobby.guideName && lobby.guideName}</h3>
      <h4>Travellers:</h4>
      {lobby.travellersNames &&
        lobby.travellersNames.length !== 0 &&
        lobby.travellersNames.map((l: string) => <h2 key={l}>{l}</h2>)}
      {isGuide && (
        <button
          onClick={() => {
            socket.emit("send-lobby", lobby.gameId, true);
          }}
        >
          Let's play!
        </button>
      )}
    </div>
  );
};
export { LobbyPage };
