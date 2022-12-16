export type GameState =
  | { state: "setup"; game: Game }
  | { state: "running"; game: Game }
  | { state: "ended"; game: Game };

type Lobby = {
  id: string;
  name: string;
  guide: string;
  travellers: string[];
};

type Game = {
  id: string;
  name: string | null;
  guide: Guide | null;
  travellers: Traveller[];
  places: Place[];
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

// SOCKET.IO TYPES
interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: BufferSource) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
