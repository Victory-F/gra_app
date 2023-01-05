import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EndGameCase, Reply } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import {
  BlueLightText,
  Button,
  CreateWrapper,
  Form,
  Input,
  PreviewWrapper,
  Text,
  Title,
} from "../styled";
import { BackgroundWrapper } from "../styled/BackgroundWrapper";

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
    <CreateWrapper>
      <Form onSubmit={submitForm}>
        <Title>Create End Game Cases</Title>
        <Input
          placeholder="message"
          maxLength={50}
          value={cases[0].message}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCases(
              cases.map((c) =>
                c.type === "won" ? { ...c, message: e.currentTarget.value } : c
              )
            )
          }
          required
        />
        <Input
          placeholder="image URL"
          value={cases[0].imgUrl}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCases(
              cases.map((c) =>
                c.type === "won" ? { ...c, imgUrl: e.currentTarget.value } : c
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
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCases(
              cases.map((c) =>
                c.type === "lost" ? { ...c, message: e.currentTarget.value } : c
              )
            )
          }
          required
        />
        <Input
          placeholder="image URL"
          value={cases[1].imgUrl}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCases(
              cases.map((c) =>
                c.type === "lost" ? { ...c, imgUrl: e.currentTarget.value } : c
              )
            )
          }
          required
        />
        <Text>Lose Case</Text>
        <Button type="submit">CREATE</Button>
      </Form>
      <PreviewWrapper>
        {/* <CasesWrapper> */}
        <BackgroundWrapper
          style={
            cases[0].imgUrl && !cases[1].imgUrl && !cases[1].message
              ? { backgroundImage: `url(${cases[0].imgUrl})` }
              : { backgroundImage: `url(${cases[1].imgUrl})` }
          }
        >
          {(cases[0].message || cases[1].message) && (
            <BlueLightText
              style={
                cases[1].message
                  ? {
                      background: "rgba(0, 0, 0, 0.7)",
                      padding: "1.5vw",
                      color: "black",
                    }
                  : { background: "rgba(0, 0, 0, 0.7)", padding: "1.5vw" }
              }
            >
              {cases[0].message && !cases[1].message && !cases[1].imgUrl
                ? cases[0].message
                : cases[1].message}
            </BlueLightText>
          )}
        </BackgroundWrapper>
      </PreviewWrapper>
    </CreateWrapper>
  );
};
export { CreateEndGameCasesPage };
