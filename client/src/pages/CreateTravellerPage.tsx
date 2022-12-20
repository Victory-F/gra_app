import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Reply, Traveller } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const CreateTravellerPage = ({
  setMessage,
}: {
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");

  const [traveller, setTraveller] = useState<Traveller>({
    id: "",
    name: "",
    kind: "",
    ability: "",
    abilityDescription: "",
    imgUrl: "",
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("add-traveller", traveller, code, (response: Reply) => {
      if (response.success) {
        localStorage.clear();
        localStorage.setItem("token", code);
        localStorage.setItem("player", traveller.id);
        navigate("/start-game");
      }
      setMessage(response.message);
    });
  };

  return (
    <div>
      <h1>Create Traveller</h1>
      <form onSubmit={submitForm}>
        <input
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
        <br />
        <input
          placeholder="kind"
          value={traveller.kind}
          onChange={(e) => setTraveller({ ...traveller, kind: e.target.value })}
          required
        />
        <br />
        <input
          placeholder="ability"
          value={traveller.ability}
          onChange={(e) =>
            setTraveller({ ...traveller, ability: e.target.value })
          }
          required
        />
        <br />
        <input
          placeholder="ability description"
          value={traveller.abilityDescription}
          onChange={(e) =>
            setTraveller({
              ...traveller,
              abilityDescription: e.target.value,
            })
          }
          required
        />
        <br />
        <input
          placeholder="image/gif URL"
          value={traveller.imgUrl}
          onChange={(e) =>
            setTraveller({ ...traveller, imgUrl: e.target.value })
          }
          required
        />
        <br />
        <h3>Enter the Secret Code</h3>

        <input
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Join!</button>
      </form>
    </div>
  );
};
export { CreateTravellerPage };
