import { Encounter } from "../../../types/gameTypes";

const EncounterCard = ({
  encounter,
  children,
}: {
  encounter: Encounter;
  children?: JSX.Element[] | JSX.Element;
}) => {
  return (
    <div>
      <div>
        <h1>{encounter.name}</h1>
        <h3>{encounter.kind}</h3>
        <p>{encounter.description}</p>
        {(encounter.secretVisibleTo.includes(
          localStorage.getItem("player") + ""
        ) ||
          encounter.secretVisibleTo.includes("all") ||
          localStorage.getItem("token") + "" ===
            localStorage.getItem("player") + "") && (
          <p>Secret: {encounter.secret}</p>
        )}
        {children}
      </div>
    </div>
  );
};
export { EncounterCard };
