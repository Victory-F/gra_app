import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reply, Traveller } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import { Button, Form, Input, Text, Title } from "../styled";

const CreateTravellerPage = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const [traveller, setTraveller] = useState<Traveller>({
    id: "",
    name: "",
    kind: "",
    ability: "",
    imgUrl: "",
  });

  useEffect(() => {
    game && navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("add-traveller", traveller, code, (response: Reply) => {
      if (response.success) {
        localStorage.setItem("token", code);
        localStorage.setItem("player", traveller.id);
        navigate("/start-game");
      }
      setMessage(response.message);
    });
  };

  return (
    <Form onSubmit={submitForm}>
      <Title>Create Traveller</Title>
      <Input
        placeholder="name"
        value={traveller.name}
        onChange={(e) =>
          setTraveller({
            ...traveller,
            id:
              socket.id.toString().slice(0, 3) +
              (Math.random() * 1000).toString().slice(0, 3),
            name: e.target.value,
          })
        }
        required
      />
      <Input
        placeholder="kind"
        value={traveller.kind}
        onChange={(e) => setTraveller({ ...traveller, kind: e.target.value })}
        required
      />
      <Input
        placeholder="ability"
        value={traveller.ability}
        onChange={(e) =>
          setTraveller({ ...traveller, ability: e.target.value })
        }
        required
      />
      <Input
        placeholder="image URL"
        value={traveller.imgUrl}
        onChange={(e) => setTraveller({ ...traveller, imgUrl: e.target.value })}
        required
      />
      <Input
        placeholder="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <Text>Enter the Secret Code</Text>
      <Button type="submit">JOIN</Button>
    </Form>
  );
};
export { CreateTravellerPage };
