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
} from "../types/gameTypes";

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
  socket.on("create-guide", (guide) => {
    games.push({
      id: guide.id,
      name: null,
      guide: guide,
      travellers: [],
      places: [],
    });
    console.log(games);
  });
  socket.on("add-location", (location, gameId) => {
    games = games.map((game) =>
      game.id === gameId
        ? { ...game, places: [...game.places, location] }
        : game
    );
  });
  socket.on("add-game-name", (gameName, gameId) => {
    games = games.map((game) =>
      game.id === gameId ? { ...game, name: gameName } : game
    );
    console.log("GAMES", games);
  });
  socket.on("check-code", (code) => {
    games.find((game) => game.id === code)
      ? console.log("found")
      : console.log("not found");
  });
  socket.on("add-traveller", (traveller, code) => {
    games = games.map((game) =>
      game.id === code
        ? { ...game, travellers: [...game.travellers, traveller] }
        : game
    );
    console.log("TravellerAdded", traveller);
  });

  socket.on("send-game", (gameId) => {
    io.to(gameId).emit(
      "receive-game",
      games.find((g) => g.id === gameId)
    );
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
