import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Guide } from "../../../types/gameTypes";
import { createGuide } from "../store/game/slice";

const CreateGuidePage = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();

  const [guide, setGuide] = useState<Guide>({
    id: "GENERATE_ID",
    name: "",
    kind: "",
    description: "",
    imgUrl: "",
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createGuide(guide));
    navigate("/create-location");
  };

  return (
    <div>
      <h1>Create Guide</h1>
      <form onSubmit={submitForm}>
        <input
          placeholder="name"
          value={guide.name}
          onChange={(e) => setGuide({ ...guide, name: e.target.value })}
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
