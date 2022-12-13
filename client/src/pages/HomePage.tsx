import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <NavLink to="/create-guide">Create a Guide</NavLink>
      <br />
      <NavLink to="/create-traveller">Create a Traveller</NavLink>
    </div>
  );
};
export { HomePage };
