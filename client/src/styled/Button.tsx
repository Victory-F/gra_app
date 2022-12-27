const styled = require("styled-components");

const Button = styled.button`
  font-size: 1.5vw;
  margin: 2vw;
  background: none;
  color: #ffffe7;
  border: 0.2vw solid #fff;
  border-radius: 0.7vw;
  padding: 0.5em;
  box-shadow: 0 0 0.8vw #d9555f, 0 0 1vw #d9555f, inset 0 0 1.3vw #d9555f;
  &:hover,
  &:focus {
    box-shadow: 0 0 1vw #d9555f, 0 0 2vw #d9555f, inset 0 0 1.5vw #d9555f;
  }
  cursor: pointer;
`;
export { Button };
