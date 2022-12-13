import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGameName } from "../store/game/slice";

const CreateGameNamePage = () => {
  const dispatch = useDispatch();
  const [gameName, setGameName] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addGameName(gameName));
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
