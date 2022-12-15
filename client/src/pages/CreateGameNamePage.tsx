import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";

const CreateGameNamePage = () => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("add-game-name", gameName, localStorage.getItem("token"));
    navigate("/start-game");
  };

  return (
    <div>
      <h1>Give your game a name</h1>
      <form onSubmit={submitForm}>
        <input
          placeholder="game name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <br />
        <button type="submit">Play!</button>
      </form>
    </div>
  );
};
export { CreateGameNamePage };
