import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const StartGamePage = () => {
  const navigate = useNavigate();

  const [thisGame, setThisGame] = useState<Game>({
    id: "",
    name: null,
    guide: null,
    travellers: [],
    places: [],
  });

  socket.emit("join-room", localStorage.getItem("token"));

  useEffect(() => {
    socket.emit("send-game", localStorage.getItem("token"));
  }, []);

  socket.on("receive-game", (game) => {
    setThisGame(game);
    console.log(thisGame.toString());
  });

  return (
    <div>
      <h1>Name of The Game: {thisGame.name && thisGame.name}</h1>
      <h2>Code: {thisGame.id && thisGame.id}</h2>
      <h3>Guide: {thisGame.guide && thisGame.guide.name}</h3>
      <h4>Travellers:</h4>
      {thisGame.travellers &&
        thisGame.travellers.length !== 0 &&
        thisGame.travellers.map((t) => <h2 key={t.id}>{t.name}</h2>)}
      <button
        onClick={() => {
          navigate("/play-game");
          localStorage.setItem("location", "0");
        }}
      >
        Let's play!
      </button>
    </div>
  );
};
export { StartGamePage };
