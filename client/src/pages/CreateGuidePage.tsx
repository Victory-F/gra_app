import { useState } from "react";

const CreateGuidePage = () => {
  const [name, setName] = useState("");
  const [race, setRace] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Create Guide</h1>
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
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
export { CreateGuidePage };
