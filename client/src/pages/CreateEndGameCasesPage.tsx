import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EndGameCase, Reply } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Input } from "../styled";

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
    <div>
      <h1>Create EndGame Cases</h1>
      <form onSubmit={submitForm}>
        <h2>Win Case</h2>
        <Input
          placeholder="message"
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
        <br />
        <Input
          placeholder="imgUrl"
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
        <br />
        <h2>Lose Case</h2>
        <Input
          placeholder="message"
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
        <br />
        <Input
          placeholder="imgUrl"
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
        <br />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};
export { CreateEndGameCasesPage };
