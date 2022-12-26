import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EndGameCase, Reply } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Button, Form, Input, Text, Title } from "../styled";

const CreateEndGameCasesPage = ({
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
    !isGuide && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cases, setCases] = useState<EndGameCase[]>([
    { type: "won", message: "", imgUrl: "" },
    { type: "lost", message: "", imgUrl: "" },
  ]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(
      "add-endgame-cases",
      localStorage.getItem("token"),
      cases,
      (response: Reply) => {
        if (response.success) {
          navigate("/create-game-name");
        }
        setMessage(response.message);
      }
    );
  };

  return (
    <Form onSubmit={submitForm}>
      <Title>Create End Game Cases</Title>
      <Input
        placeholder="message"
        maxLength={50}
        value={cases[0].message}
        onChange={(e) =>
          setCases(
            cases.map((c) =>
              c.type === "won" ? { ...c, message: e.target.value } : c
            )
          )
        }
        required
      />
      <Input
        placeholder="image URL"
        value={cases[0].imgUrl}
        onChange={(e) =>
          setCases(
            cases.map((c) =>
              c.type === "won" ? { ...c, imgUrl: e.target.value } : c
            )
          )
        }
        required
      />
      <Text>Win Case</Text>
      <br />
      <Input
        placeholder="message"
        maxLength={50}
        value={cases[1].message}
        onChange={(e) =>
          setCases(
            cases.map((c) =>
              c.type === "lost" ? { ...c, message: e.target.value } : c
            )
          )
        }
        required
      />
      <Input
        placeholder="image URL"
        value={cases[1].imgUrl}
        onChange={(e) =>
          setCases(
            cases.map((c) =>
              c.type === "lost" ? { ...c, imgUrl: e.target.value } : c
            )
          )
        }
        required
      />
      <Text>Lose Case</Text>
      <Button type="submit">CREATE</Button>
    </Form>
  );
};
export { CreateEndGameCasesPage };
