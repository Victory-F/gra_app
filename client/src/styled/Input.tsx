import styled from "styled-components";
export const Input = styled.input`
  height: 2.5vw;
  width: 20vw;
  padding: 0.7vw;
  margin: 1vw;
  background: none;
  border: none;
  font-size: 1.3vw;
  color: #ffffe7;
  border-bottom: 0.1vw solid #fff;
  box-shadow: 0 1.3vw 1vw -1vw #d9555f;
  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0 1.5vw 1vw -1vw #d9555f;
  }
`;
