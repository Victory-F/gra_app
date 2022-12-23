import styled from "styled-components";
import { Traveller } from "../../../types/gameTypes";
import { Kind, Name, NameKind } from "../styled";

const TravellerCard = ({
  traveller,
  // travellerPoints,
  secretButton,
  children,
}: // increaseButton,
// decreaseButton,
{
  traveller: Traveller;
  // travellerPoints: number;
  secretButton: React.ReactNode;
  children: React.ReactNode;
  // increaseButton: React.ReactNode;
  // decreaseButton: React.ReactNode;
}) => {
  console.log("I rerender");
  return (
    <TravellerContainer>
      <Character>
        <NameKind>
          <Name>{traveller.name}</Name>
          <Kind>{traveller.kind}</Kind>
        </NameKind>
        <MiddleWrapper>
          {secretButton}
          <TravellerImage src={traveller.imgUrl} />
          <Stats>{children}</Stats>
        </MiddleWrapper>
        <Ability>{traveller.ability}</Ability>
      </Character>
    </TravellerContainer>
  );
};
export { TravellerCard };

const TravellerImage = styled.img`
  min-width: 50%;
  min-height: 70%;
  max-width: 70%;
  max-height: 90%;
  align-self: center;
`;
const TravellerContainer = styled.div`
  min-width: 10vw;
  min-height: 10vw;
  width: 15vw;
  height: 15vw;
  max-width: 15vw;
  max-height: 15vw;
  font-size: 0.7rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  padding: 10px;
`;
const Character = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Stats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 20%;
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5%;
  align-items: center;
  height: 70%;
  width: 100%;
`;
const Ability = styled.p`
  margin: 0;
`;
