export type GameState = "setup" | "lobby" | "running" | "ended";

type Game = {
  id: string;
  name: string;
  guide: Guide;
  travellers: Traveller[];
  places: Place[];
  travellersPoints: TravellerPoints[];
  state: GameState;
  endGameCases: EndGameCase[];
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
  imgUrl: string;
};

type Place = {
  id: string;
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
};

type Lobby = {
  gameId: string;
  gameName: string;
  guideName: string;
  travellersNames: TravellerIdName[];
};

type TravellerIdName = {
  id: string;
  name: string;
};
type GamePlayers = {
  gameId: string;
  gameName: string;
  guide: Guide;
  travellers: Traveller[];
};

type TravellerPoints = {
  plyerId: string;
  points: number;
};

type EndGameCase = {
  type: "won" | "lost";
  message: string;
  imgUrl: string;
};

type Callback = (response: Reply) => void;

type Reply = {
  success: boolean;
  message: string;
};
