import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const GamePage = () => {
  const navigate = useNavigate();

  const [thisGame, setThisGame] = useState<Game>({
    id: "",
    name: "",
    guide: null,
    travellers: [],
    places: [],
  });

  const locationNumber: number =
    parseInt(localStorage.getItem("location") + "") + 1;

  // socket.emit("game-play", localStorage.getItem("token"));
  // socket.on("game-play-data", (game) => {
  //   setThisGame(game);
  // });
  console.log("I rerender");
  return (
    <div>
      Game Page
      <div>
        <h1>Current Place</h1>
        {thisGame.name
          ? thisGame.places[locationNumber - 1].name
          : "Loading..."}
      </div>
      <button onClick={() => navigate("/play-game")}>Next Location</button>
    </div>
  );
};
export { GamePage };
