import styled from "styled-components";
import { Title } from "./Title";

const BlueLightText = styled(Title)`
  margin: 0;
  text-shadow: 0 0 0.8vw #3f26bf, 0 0 1vw #3f26bf, 0 0 1.3vw #3f26bf;
  &:hover,
  &:focus {
    text-shadow: 0 0 0.8vw #ffd12a, 0 0 1vw #ffd12a, 0 0 1.3vw #ffd12a;
  }
`;

export { BlueLightText };
