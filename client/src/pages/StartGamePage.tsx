import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lobby } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const StartGamePage = () => {
  const navigate = useNavigate();

  const [lobby, setLobby] = useState<Lobby>({
    id: "",
    name: "",
    guide: "",
    travellers: [],
  });

  useEffect(() => {
    socket.emit("send-lobby", localStorage.getItem("token"), false);
    socket.on("get-lobby", (lobby: Lobby) => {
      setLobby(lobby);
    });
    socket.on("set-start", (start: boolean) => {
      start && navigate("/play-game");
    });
  }, [navigate]);

  return (
    <div>
      <h1>Name of The Game: {lobby.name && lobby.name}</h1>
      <h2>Code: {lobby.id && lobby.id}</h2>
      <h3>Guide: {lobby.guide && lobby.guide}</h3>
      <h4>Travellers:</h4>
      {lobby.travellers &&
        lobby.travellers.length !== 0 &&
        lobby.travellers.map((l: string) => <h2 key={l}>{l}</h2>)}
      <button
        onClick={() => {
          socket.emit("send-lobby", lobby.id, true);
        }}
      >
        Let's play!
      </button>
      <button>Exit The Game</button>
    </div>
  );
};
export { StartGamePage };
