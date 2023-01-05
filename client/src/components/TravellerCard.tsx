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
  secretButton?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <CharacterContainer>
      <NameKind>
        <Name>{traveller.name}</Name>
        <Kind>{traveller.kind}</Kind>
      </NameKind>
      <MiddleWrapper
        style={
          !secretButton && !children
            ? { justifyContent: "center" }
            : { justifyContent: "space-between" }
        }
      >
        {secretButton && secretButton}
        <CharacterImage src={traveller.imgUrl} />
        {children && <Stats>{children}</Stats>}
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
  width: 1.3vw;
`;

const MiddleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1vw;
  min-width: 12.5vw;
  padding: 0.5vw;
`;
