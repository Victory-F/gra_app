import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reply } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const CreateGameNamePage = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const isGuide: boolean = game
    ? localStorage.getItem("token") === localStorage.getItem("player")
    : false;
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(
      "add-game-name",
      gameName,
      localStorage.getItem("token"),
      (response: Reply) => {
        if (response.success) {
          navigate("/start-game");
        }
        setMessage(response.message);
      }
    );
  };

  useEffect(() => {
    !isGuide && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
