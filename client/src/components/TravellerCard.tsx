import { Traveller } from "../../types/gameTypes";
import {
  CharacterContainer,
  Kind,
  Name,
  NameKind,
  CharacterImage,
  Description,
} from "../styled";

import styled from "styled-components";

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
  justify-content: space-around;
  align-items: center;
  gap: 0.5vw;
  min-width: 1.9vw;
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1vw;
  min-width: 15vw;
`;
