import styled from "styled-components";
import { Encounter } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import {
  BlueLightText,
  CharacterContainer,
  Description,
  Kind,
  Name,
  NameKind,
  Secret,
} from "../styled";

const EncounterCard = ({
  encounter,
  secretVisible,
}: {
  encounter: Encounter;
  secretVisible: boolean;
}) => {
  const game: boolean =
    localStorage.getItem("token") && localStorage.getItem("player")
      ? true
      : false;

  const isGuide: boolean = game
    ? localStorage.getItem("token") === localStorage.getItem("player")
    : false;

  return (
    <EncounterContainer>
      <NameKind>
        <Name>{encounter.name}</Name>
        <Kind>{encounter.kind}</Kind>
      </NameKind>
      <EncounterImage src={encounter.imgUrl} />
      <Description>{encounter.description}</Description>
      {isGuide ? (
        <Secret
          onClick={() => {
            socket.emit(
              "set-secret-visible",
              localStorage.getItem("token"),
              "all",
              true
            );
          }}
        >
          <BlueLightText>✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧</BlueLightText>
        </Secret>
      ) : (
        <BlueLightText>✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧</BlueLightText>
      )}
      {(secretVisible || isGuide) && <Kind>{encounter.secret}</Kind>}
    </EncounterContainer>
  );
};
export { EncounterCard };

const EncounterImage = styled.img`
  max-height: 19vw;
  max-width: 23vw;
`;
const EncounterContainer = styled(CharacterContainer)`
  position: relative;
  height: 31vw;
  width: 23vw;
  border-radius: 0;
  padding: 1vw;
  z-index: 1;
`;
