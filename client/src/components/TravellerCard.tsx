import { Traveller, TravellerPoints } from "../../../types/gameTypes";

const TravellerCard = ({
  traveller,
  travellerPoints,
  children,
}: {
  traveller: Traveller;
  travellerPoints: number;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <h1>{traveller.name}</h1>
      <h3>{traveller.kind}</h3>
      <p>{traveller.ability}</p>
      <p>{traveller.abilityDescription}</p>
      <p>{travellerPoints}</p>
      {children}
    </div>
  );
};
export { TravellerCard };
