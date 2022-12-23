import styled from "styled-components";
import { Traveller } from "../../../types/gameTypes";

const TravellerCard = ({
  traveller,
  travellerPoints,
  children,
}: {
  traveller: Traveller;
  travellerPoints: number;
  children?: React.ReactNode;
}) => {
  return (
    <TravellerContainer>
      {children}
      <h3>{traveller.name}</h3>
      <p>{traveller.kind}</p>
      <TravellerImage src={traveller.imgUrl} />
      <p>{traveller.ability}</p>
      <p>{traveller.abilityDescription}</p>
      <p>{travellerPoints}</p>
    </TravellerContainer>
  );
};
export { TravellerCard };

const TravellerContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid white;
  max-width: 20vh;
  max-height: 15vh;
  font-size: 12px;
`;
const TravellerImage = styled.img`
  max-width: 10%;
`;
