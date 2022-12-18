import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Guide } from "../../../types/gameTypes";
import { socket } from "../socket/socket";

const CreateGuidePage = () => {
  const navigate: NavigateFunction = useNavigate();

  const [guide, setGuide] = useState<Guide>({
    id: "",
    name: "",
    kind: "",
    description: "",
    imgUrl: "",
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("create-guide", guide);
    localStorage.setItem("token", guide.id);
    localStorage.setItem("player", guide.id);
    navigate("/create-location");
  };

  return (
    <div>
      <h1>Create Guide</h1>
      <form onSubmit={submitForm}>
        <input
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
        <input
          placeholder="kind"
          value={guide.kind}
          onChange={(e) => setGuide({ ...guide, kind: e.target.value })}
          required
        />
        <br />
        <input
          placeholder="description"
          value={guide.description}
          onChange={(e) => setGuide({ ...guide, description: e.target.value })}
          required
        />
        <br />
        <input
          placeholder="image/gif URL"
          value={guide.imgUrl}
          onChange={(e) => setGuide({ ...guide, imgUrl: e.target.value })}
          required
        />
        <br />
        <button type="submit">Ready!</button>
      </form>
    </div>
  );
};
export { CreateGuidePage };
