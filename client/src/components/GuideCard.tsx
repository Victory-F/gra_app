import { Guide } from "../../../types/gameTypes";

const GuideCard = ({ guide }: { guide: Guide }) => {
  return (
    <div>
      <h3>{guide.name}</h3>
      <p>{guide.kind}</p>
      <img src={guide.imgUrl} />
      <p>{guide.description}</p>
    </div>
  );
};
export { GuideCard };
