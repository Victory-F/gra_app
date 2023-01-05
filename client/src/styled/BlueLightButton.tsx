import styled from "styled-components";
import { Name } from "./Name";

const BlueLightButton = styled(Name)`
  margin: 0;
  color: white;
  text-shadow: 0 0 0.8vw grey, 0 0 1vw grey, 0 0 1.3vw grey;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 0.8vw lightgrey, 0 0 1vw lightgrey, 0 0 1.3vw lightgrey;
  }
`;

export { BlueLightButton };
