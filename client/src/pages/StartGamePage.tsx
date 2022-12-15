import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Game } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const StartGamePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [thisGame, setThisGame] = useState<Game>({
    id: "",
    name: null,
    guide: null,
    travellers: [],
    places: [],
  });

  socket.on("game-data", (game) => {
    setThisGame(game);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit("start-game", localStorage.getItem("token"));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  console.log("I rerender");
  return (
    <div>
      <h1>Name of The Game: {thisGame.name && thisGame.name}</h1>
      <h2>Code: {thisGame.id && thisGame.id}</h2>
      <h3>Guide: {thisGame.guide && thisGame.guide.name}</h3>
      <h4>Travellers:</h4>
      {thisGame.travellers &&
        thisGame.travellers.length !== 0 &&
        thisGame.travellers.map((t) => <h2>{t.name}</h2>)}
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
