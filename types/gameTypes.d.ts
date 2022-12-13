export type GameState =
  | { state: "setup"; game: Game }
  | { state: "running"; game: Game }
  | { state: "ended"; game: Game };

type Game = {
  id: string;
  name: string;
  guide: Guide | null;
  travellers: Traveller[] | null;
  places: Place[] | null;
};

type Guide = {
  id: string;
  name: string;
  kind: string;
  description: string;
  imgUrl: string;
};

type Traveller = {
  id: string;
  name: string;
  kind: string;
  ability: string;
  abilityDescription: string;
  imgUrl: string;
  points: number;
};

type Place = {
  name: string;
  imgUrl: string;
  encounter: Encounter;
};

type Encounter = {
  name: string;
  kind: string;
  imgUrl: string;
  description: string;
  secret: string;
  visibleTo: string[];
};
