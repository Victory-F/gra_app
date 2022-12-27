import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Guide, Reply } from "../../types/gameTypes";
import { socket } from "../socket/socket";
import { Button, Form, Input, Title } from "../styled";

const CreateGuidePage = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const navigate: NavigateFunction = useNavigate();

  const [guide, setGuide] = useState<Guide>({
    id: "",
    name: "",
    kind: "",
    description: "",
    imgUrl: "",
  });

  useEffect(() => {
    game && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("create-guide", guide, (response: Reply) => {
      if (response.success) {
        localStorage.setItem("token", guide.id);
        localStorage.setItem("player", guide.id);
        navigate("/create-location");
      } else {
        navigate("/");
      }
      setMessage(response.message);
    });
  };

  return (
    <Form onSubmit={submitForm}>
      <Title>Create Guide</Title>
      <Input
        placeholder="name"
        maxLength={12}
        value={guide.name}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setGuide({
            ...guide,
            id:
              (Math.random() * 1000).toString().slice(0, 3) +
              socket.id.toString().slice(0, 3),
            name: e.currentTarget.value,
          })
        }
        required
      />
      <Input
        placeholder="kind"
        maxLength={15}
        value={guide.kind}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setGuide({ ...guide, kind: e.currentTarget.value })
        }
        required
      />
      <Input
        placeholder="description"
        maxLength={30}
        value={guide.description}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setGuide({ ...guide, description: e.currentTarget.value })
        }
        required
      />
      <Input
        placeholder="image URL"
        value={guide.imgUrl}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setGuide({ ...guide, imgUrl: e.currentTarget.value })
        }
        required
      />
      <Button type="submit">CREATE</Button>
    </Form>
  );
};
export { CreateGuidePage };
