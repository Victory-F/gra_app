import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Server, Socket } from "socket.io";
import {
  Game,
  GameState,
  ServerToClientEvents,
  ClientToServerEvents,
  SocketData,
  InterServerEvents,
  Traveller,
  Place,
} from "../types/gameTypes";
import { start } from "repl";

const PORT = process.env.PORT || 4000;
const app: Application = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let currGame: Game;

let games: Game[] = [];

// Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on("connection", (socket: Socket) => {
  console.log("New connection", socket.id);
  socket.on("create-guide", (guide) => {
    games.push({
      id: guide.id,
      name: "",
      guide: guide,
      travellers: [],
      places: [],
    });
    console.log(games);
  });
  socket.on("add-location", (location: Place, gameId: string) => {
    games = games.map((game) =>
      game.id === gameId
        ? { ...game, places: [...game.places, location] }
        : game
    );
  });
  socket.on("add-game-name", (gameName: string, gameId: string) => {
    games = games.map((game) =>
      game.id === gameId ? { ...game, name: gameName } : game
    );
    console.log("GAMES", games);
  });

  socket.on("check-code", (code: string) => {
    games.find((game) => game.id === code)
      ? console.log("found")
      : console.log("not found");
  });

  socket.on("add-traveller", (traveller: Traveller, code: string) => {
    games = games.map((game) =>
      game.id === code
        ? { ...game, travellers: [...game.travellers, traveller] }
        : game
    );
  });
  //LOBBY
  socket.on("send-lobby", (gameId: string, started: boolean) => {
    const game = games.find((g) => g.id === gameId);
    socket.join(gameId);
    io.to(gameId).emit("get-lobby", {
      id: gameId,
      name: game?.name,
      guide: game?.guide?.name,
      travellers: game?.travellers.map((t) => t.name),
    });
    io.to(gameId).emit("set-start", started);
  });
  //GAME
  socket.on(
    "send-game-location",
    (gameId: string, location: string, playerId: string, newPoints: number) => {
      if (newPoints) {
        games = games.map((g) =>
          g.id === gameId
            ? {
                ...g,
                travellers: g.travellers.map((t) =>
                  t.id === playerId ? { ...t, points: newPoints } : t
                ),
              }
            : g
        );
      }
      const locationIndex: number =
        location === "null" ? 0 : parseInt(location);
      const game = games.find((g) => g.id === gameId);
      socket.join(gameId);
      if (
        locationIndex + 1 === game?.places.length &&
        game.places.length !== 1
      ) {
        io.to(gameId).emit("get-game-finish", true);
      } else {
        io.to(gameId).emit("get-game-location", {
          id: gameId,
          name: game?.name,
          guide: game?.guide?.name,
          travellers: game?.travellers,
          place: game?.places[locationIndex],
        });
      }
    }
  );
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
