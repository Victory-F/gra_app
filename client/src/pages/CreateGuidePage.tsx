import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Guide, Reply } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Form, Input } from "../styled";

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
    <div>
      <h1>Create Guide</h1>
      <Form onSubmit={submitForm}>
        <Input
          placeholder="name"
          value={guide.name}
          onChange={(e) =>
            setGuide({
              ...guide,
              id:
                (Math.random() * 1000).toString().slice(0, 3) +
                socket.id.toString().slice(0, 3),
              name: e.target.value,
            })
          }
          required
        />
        <br />
        <Input
          placeholder="kind"
          value={guide.kind}
          onChange={(e) => setGuide({ ...guide, kind: e.target.value })}
          required
        />
        <br />
        <Input
          placeholder="description"
          value={guide.description}
          onChange={(e) => setGuide({ ...guide, description: e.target.value })}
          required
        />
        <br />
        <Input
          placeholder="image/gif URL"
          value={guide.imgUrl}
          onChange={(e) => setGuide({ ...guide, imgUrl: e.target.value })}
          required
        />
        <br />
        <button type="submit">Ready!</button>
      </Form>
    </div>
  );
};
export { CreateGuidePage };
