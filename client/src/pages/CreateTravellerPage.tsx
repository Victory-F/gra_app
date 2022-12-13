import { useState } from "react";
import { Traveller } from "../../../types/gameTypes";

const CreateTravellerPage = () => {
  const [traveller, setTraveller] = useState<Traveller>({
    id: "GENERATE_ID",
    name: "",
    kind: "",
    ability: "",
    abilityDescription: "",
    imgUrl: "",
    points: 0,
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(traveller);
  };

  return (
    <div>
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
