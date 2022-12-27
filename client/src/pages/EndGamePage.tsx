import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styled from "styled-components";
import { EndGameCase } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { BlueLightText } from "../styled";

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

  return (
    <EndGamePageContainer
      style={{ backgroundImage: `url(${endGameCase.imgUrl})` }}
    >
      <TextContainer>
        <BlueLightText>{endGameCase.message}</BlueLightText>
      </TextContainer>
    </EndGamePageContainer>
  );
};
export { EndGamePage };

const EndGamePageContainer = styled.div`
  margin-top: 5.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  min-height: 100vh;
  min-width: 100vw;
`;
const TextContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  width: 50vw;
  padding: 5vw;
  text-align: center;
`;
