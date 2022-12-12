export type GameState =
  | { state: "setup"; game: Game }
  | { state: "running"; game: Game }
  | { state: "ended"; game: Game };

type Game = {
  id: string;
  guide: Guide | null;
  travellers: Traveller[];
  places: Place[];
};

type Guide = {
  id: number;
  name: string;
  imgUrl: string;
};

type Traveller = {
  id: number;
  name: string;
  imgUrl: string;
  ability: string;
  points: number;
};

type Place = {
  //   id: number;
  name: string;
  imgUrl: string;
  encounter?: Encounter;
};
type Encounter = {
  //   id: number;
  name: string;
  imgUrl: string;
  description: string;
  timeStart: Date;
  durationSeconds: number;
  visibleTo: number[];
};
