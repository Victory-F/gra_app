import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reply, Traveller } from "../../../types/gameTypes";
import { TravellerCard } from "../components";
import { socket } from "../socket/socket";
import { Button, CreateWrapper, Form, Input, Text, Title } from "../styled";

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
    <CreateWrapper>
      <Form onSubmit={submitForm}>
        <Title>Create Traveller</Title>
        <Input
          placeholder="name"
          maxLength={12}
          value={traveller.name}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTraveller({
              ...traveller,
              id:
                socket.id.toString().slice(0, 3) +
                (Math.random() * 1000).toString().slice(0, 3),
              name: e.currentTarget.value,
            })
          }
          required
        />
        <Input
          placeholder="kind"
          maxLength={15}
          value={traveller.kind}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTraveller({ ...traveller, kind: e.currentTarget.value })
          }
          required
        />
        <Input
          placeholder="image URL"
          value={traveller.imgUrl}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTraveller({ ...traveller, imgUrl: e.currentTarget.value })
          }
          required
        />
        <Input
          placeholder="ability"
          maxLength={15}
          value={traveller.ability}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setTraveller({ ...traveller, ability: e.currentTarget.value })
          }
          required
        />
        <Input
          placeholder="code"
          maxLength={6}
          value={code}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setCode(e.currentTarget.value)
          }
          required
        />
        <Text>Enter the Secret Code</Text>
        <Button type="submit">JOIN</Button>
      </Form>
      <TravellerCard traveller={traveller} />
    </CreateWrapper>
  );
};
export { CreateTravellerPage };
