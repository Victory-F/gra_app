import { Traveller } from "../../../types/gameTypes";

const TravellerCard = ({
  traveller,
  children,
}: {
  traveller: Traveller;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <h1>{traveller.name}</h1>
      <h3>{traveller.kind}</h3>
      <p>{traveller.ability}</p>
      <p>{traveller.abilityDescription}</p>
      <p>{traveller.points}</p>
      {children}
    </div>
  );
};
export { TravellerCard };
