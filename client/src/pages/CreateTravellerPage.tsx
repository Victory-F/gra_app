import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Traveller } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const CreateTravellerPage = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [traveller, setTraveller] = useState<Traveller>({
    id: "",
    name: "",
    kind: "",
    ability: "",
    abilityDescription: "",
    imgUrl: "",
    points: 0,
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("add-traveller", traveller, code);
    localStorage.clear();
    localStorage.setItem("token", code);
    socket.emit("add-traveller");
    navigate("/start-game");
  };

  const submitCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("check-code", code);
  };

  return (
    <div>
      <h3>Enter the Secret Code</h3>
      <form onSubmit={submitCode}>
        <input
          placeholder="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit">Check the code</button>
      </form>

      <h1>Create Traveller</h1>
      <form onSubmit={submitForm}>
        <input
          placeholder="name"
          value={traveller.name}
          onChange={(e) => setTraveller({ ...traveller, name: e.target.value })}
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
            setTraveller({ ...traveller, abilityDescription: e.target.value })
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
        <button type="submit">Ready!</button>
      </form>
    </div>
  );
};
export { CreateTravellerPage };
