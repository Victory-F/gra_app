import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reply } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Button, Form, Input, Title } from "../styled";

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
    <Form onSubmit={submitForm}>
      <Title>Create Game Name</Title>
      <Input
        placeholder="name"
        maxLength={30}
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        required
      />
      <Button type="submit">Play!</Button>
    </Form>
  );
};
export { CreateGameNamePage };
