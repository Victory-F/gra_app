import styled from "styled-components";
import { Traveller } from "../../../types/gameTypes";
import {
  CharacterContainer,
  Kind,
  Name,
  NameKind,
  CharacterImage,
  Description,
} from "../styled";

const TravellerCard = ({
  traveller,
  secretButton,
  children,
}: {
  traveller: Traveller;
  secretButton: React.ReactNode;
  children: React.ReactNode;
}) => {
  console.log("I rerender");
  return (
    <CharacterContainer>
      <NameKind>
        <Name>{traveller.name}</Name>
        <Kind>{traveller.kind}</Kind>
      </NameKind>
      <MiddleWrapper>
        {secretButton}
        <CharacterImage src={traveller.imgUrl} />
        <Stats>{children}</Stats>
      </MiddleWrapper>
      <Description>{traveller.ability}</Description>
    </CharacterContainer>
  );
};
export { TravellerCard };

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
`;
