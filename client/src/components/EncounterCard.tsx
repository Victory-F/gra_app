import { Encounter } from "../../../types/gameTypes";

const EncounterCard = ({
  encounter,
  secretVisibile,
  children,
}: {
  encounter: Encounter;
  secretVisibile: boolean;
  children?: JSX.Element[] | JSX.Element;
}) => {
  return (
    <div>
      <div>
        <h1>{encounter.name}</h1>
        <h3>{encounter.kind}</h3>
        <p>{encounter.description}</p>
        {secretVisibile && <p>SECRET: {encounter.secret}</p>}
        {children}
      </div>
    </div>
  );
};
export { EncounterCard };
