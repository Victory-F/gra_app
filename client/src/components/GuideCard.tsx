import { Guide } from "../../../types/gameTypes";
import {
  CharacterContainer,
  Kind,
  NameKind,
  CharacterImage,
  Description,
  BlueLightText,
} from "../styled";

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <CharacterContainer
      style={{ borderRadius: "10%", padding: "0.5vw", marginTop: "1.5vh" }}
    >
      <NameKind>
        <BlueLightText>{guide.name}</BlueLightText>
        <Kind>{guide.kind}</Kind>
      </NameKind>
      <CharacterImage src={guide.imgUrl} />
      <Description>{guide.description}</Description>
    </CharacterContainer>
  );
};
export { GuideCard };
