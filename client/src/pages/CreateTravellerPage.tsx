import { useState } from "react";

const CreateTravellerPage = () => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [image, setImage] = useState("");
  const [ability, setAbility] = useState("");
  const [abilityDescription, setAbilityDescription] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Create Traveller</h1>
      <form onSubmit={submitForm}>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="race"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="ability"
          value={ability}
          onChange={(e) => setAbility(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="ability description"
          value={abilityDescription}
          onChange={(e) => setAbilityDescription(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="image/gif URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <br />
        <button type="submit">Ready!</button>
      </form>
    </div>
  );
};
export { CreateTravellerPage };
