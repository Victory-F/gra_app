import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

const HomePage = () => {
  const navigate = useNavigate();
  socket.emit("delete-game", localStorage.getItem("token") + "");
  localStorage.clear();

  return (
    <div>
      <h1>GAME HomePage</h1>
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
