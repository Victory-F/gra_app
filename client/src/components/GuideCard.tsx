import styled from "styled-components";
import { Guide } from "../../../types/gameTypes";
import { Kind, Name, NameKind } from "../styled";

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <GuideContainer>
      <NameKind>
        <Name>{guide.name}</Name>
        <Kind>{guide.kind}</Kind>
      </NameKind>
      <GuideImage src={guide.imgUrl} />
      <GuideDescription>{guide.description}</GuideDescription>
    </GuideContainer>
  );
};
export { GuideCard };

const GuideContainer = styled.div``;
const GuideImage = styled.img``;
const GuideDescription = styled.p``;
