import styled from "styled-components";
import { Encounter } from "../../../types/gameTypes";
import { socket } from "../socket/socket";
import {
  CharacterContainer,
  CharacterImage,
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
      {secretVisible || isGuide ? (
        <Description>Secret: {encounter.secret}</Description>
      ) : (
        <p>SPARKLEEESSSS!</p>
      )}
      {isGuide && (
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
          🧿
        </Secret>
      )}
    </EncounterContainer>
  );
};
export { EncounterCard };

const EncounterImage = styled.img`
  max-height: 50%;
`;
const EncounterContainer = styled(CharacterContainer)`
  height: 25vw;
  width: 20vw;
  border-radius: 0;
`;
