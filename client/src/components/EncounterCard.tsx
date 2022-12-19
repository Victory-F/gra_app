import { Encounter } from "../../../types/gameTypes";

const EncounterCard = ({
  encounter,
  secretVisible,
  children,
}: {
  encounter: Encounter;
  secretVisible: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <div>
        <h1>{encounter.name}</h1>
        <h3>{encounter.kind}</h3>
        <p>{encounter.description}</p>
        {(secretVisible ||
          localStorage.getItem("token") === localStorage.getItem("player")) && (
          <p>Secret: {encounter.secret}</p>
        )}
        {children}
      </div>
    </div>
  );
};
export { EncounterCard };
