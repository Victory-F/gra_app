// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styled from "styled-components";
import { Name } from "./Name";

const BlueLightButton = styled(Name)`
  margin: 0;
  color: white;
  text-shadow: 0 0 0.8vw #3f26bf, 0 0 1vw #3f26bf, 0 0 1.3vw #3f26bf;
  cursor: pointer;
  &:hover {
    text-shadow: 0 0 0.8vw blue, 0 0 1vw blue, 0 0 1.3vw blue;
  }
`;

export { BlueLightButton };
