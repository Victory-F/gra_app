import { useEffect, useState } from "react";
import { socket } from "../socket/socket";

const EndGamePage = () => {
  const [win, setWin] = useState<boolean>(false);
  useEffect(() => {
    socket.emit("set-end-game", localStorage.getItem("token"));
    socket.on("get-game-finished", (win: boolean) => {
      console.log(win);
      setWin(win);
    });
  });
  return <h1>Congrats!</h1>;
};
export { EndGamePage };
