import { useState } from "react";
import { Guide } from "../../../types/gameTypes";

const CreateGuidePage = () => {
  const [guide, setGuide] = useState<Guide>({
    id: "GENERATE_ID",
    name: "",
    kind: "",
    description: "",
    imgUrl: "",
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(guide);
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
