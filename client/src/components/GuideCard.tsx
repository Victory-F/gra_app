import styled from "styled-components";
import { Guide } from "../../../types/gameTypes";
import {
  CharacterContainer,
  Kind,
  Name,
  NameKind,
  CharacterImage,
  Description,
} from "../styled";

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <CharacterContainer style={{ borderRadius: "10%" }}>
      <NameKind>
        <Name>{guide.name}</Name>
        <Kind>{guide.kind}</Kind>
      </NameKind>
      <CharacterImage src={guide.imgUrl} />
      <Description>{guide.description}</Description>
    </CharacterContainer>
  );
};
export { GuideCard };
