import { useNavigate } from "react-router-dom";

const StartGamePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Name of The Game</h1>
      <h2>Code: </h2>
      <h3>Guide:</h3>
      <h4>Travellers: </h4>
      <button onClick={() => navigate("/play-game")}>Let's play!</button>
    </div>
  );
};
export { StartGamePage };
