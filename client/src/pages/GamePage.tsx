import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameLocation } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const GamePage = () => {
  const playerId: string = localStorage.getItem("player") + "";

  const navigate = useNavigate();
  const [gameLocation, setGameLocation] = useState<GameLocation>({
    id: "",
    name: "",
    guide: null,
    travellers: [],
    place: null,
  });

  useEffect(() => {
    socket.emit(
      "send-game-location",
      localStorage.getItem("token") + "",
      localStorage.getItem("location") + ""
    );
    socket.on("get-game-location", (gameLocation: GameLocation) => {
      setGameLocation(gameLocation);
      console.log(gameLocation);
    });
    socket.on("get-game-finish", (finished: boolean) => {
      finished && navigate("/");
    });
  }, [navigate]);

  return (
    <div>
      Game Page
      <div>
        <h1>Current Place</h1>
        {gameLocation.place && gameLocation.place.name}
      </div>
      {playerId === gameLocation.id && (
        <button
          onClick={() => {
            localStorage.setItem(
              "location",
              (parseInt(localStorage.getItem("location") + "") + 1).toString()
            );
            socket.emit(
              "send-game-location",
              gameLocation.id,
              localStorage.getItem("location") + ""
            );
          }}
        >
          Next Location
        </button>
      )}
    </div>
  );
};
export { GamePage };
