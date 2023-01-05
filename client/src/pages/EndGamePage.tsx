import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <BlueLightText
        style={
          endGameCase.type === "lost"
            ? {
                color: "black",
                background: "rgba(0, 0, 0, 0.7)",
                padding: "2.5vw",
                fontSize: "2vw",
              }
            : {
                color: "white",
                background: "rgba(0, 0, 0, 0.7)",
                padding: "2.5vw",
                fontSize: "2vw",
              }
        }
      >
        {endGameCase.message}
      </BlueLightText>
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
