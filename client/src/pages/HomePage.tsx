import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

const HomePage = () => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const isGuide: boolean = game
    ? localStorage.getItem("token") === localStorage.getItem("player")
    : false;

  const navigate = useNavigate();

  useEffect(() => {
    isGuide &&
      socket.emit(
        "delete-game",
        localStorage.getItem("token") + "",
        localStorage.getItem("player")
      );
    localStorage.clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/create-guide");
        }}
      >
        Create a Game
      </button>
      <br />
      <div>
        <button onClick={() => navigate("/create-traveller")}>Join game</button>
      </div>
    </div>
  );
};
export { HomePage };
