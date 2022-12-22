import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EndGameCase } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const EndGamePage = () => {
  const navigate = useNavigate();
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const [endGameCase, setEndGameCase] = useState<EndGameCase>({
    type: "lost",
    message: "",
    imgUrl: "",
  });

  useEffect(() => {
    !game && navigate("/");

    socket.emit("set-endgame", localStorage.getItem("token"));

    socket.on("get-endgame", (endGameCase: EndGameCase) => {
      setEndGameCase(endGameCase);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <h1>{endGameCase.message}!</h1>;
};
export { EndGamePage };
