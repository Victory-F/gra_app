import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket/socket";
import { Button, ButtonsWrapper } from "../styled";

const HomePage = ({
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

  useEffect(() => {
    isGuide &&
      socket.emit(
        "delete-game",
        localStorage.getItem("token") + "",
        localStorage.getItem("player")
      );
    localStorage.clear();
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ButtonsWrapper>
      <Button
        onClick={() => {
          navigate("/create-guide");
        }}
      >
        CREATE
      </Button>
      <Button onClick={() => navigate("/create-traveller")}>JOIN</Button>
    </ButtonsWrapper>
  );
};
export { HomePage };
