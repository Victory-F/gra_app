import { Guide } from "../../../types/gameTypes";
import {
  CharacterContainer,
  Kind,
  NameKind,
  CharacterImage,
  Description,
  Name,
} from "../styled";

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <CharacterContainer style={{ borderRadius: "10%", padding: "0.5vw" }}>
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
