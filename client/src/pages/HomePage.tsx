import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { socket } from "../socket/socket";
import { Button } from "../styled";

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
    <ButtonsWrapper>
      <Button
        onClick={() => {
          navigate("/create-guide");
        }}
      >
        CREATE
      </Button>
      <Button
        style={{ marginLeft: "30vw" }}
        onClick={() => navigate("/create-traveller")}
      >
        JOIN
      </Button>
    </ButtonsWrapper>
  );
};
export { HomePage };

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vw;
  align-items: self-start;
  margin-top: 10vw;
  margin-left: 12vw;
`;
