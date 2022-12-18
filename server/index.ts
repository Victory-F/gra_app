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
  Encounter,
  TravellerPoints,
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
  console.log("New connection", socket.id);
  socket.on("create-guide", (guide) => {
    games.push({
      id: guide.id,
      name: "",
      guide: guide,
      travellers: [],
      places: [],
      travellersPoints: [],
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
    const travellerPoints: TravellerPoints = {
      plyerId: traveller.id,
      points: Math.floor(
        parseInt(games.find((g) => g.id === code)?.places.length + "") / 2
      ),
    };
    games = games.map((game) =>
      game.id === code
        ? {
            ...game,
            travellers: [...game.travellers, traveller],
            travellersPoints: [...game.travellersPoints, travellerPoints],
          }
        : game
    );
  });
  //LOBBY
  socket.on("send-lobby", (gameId: string, started: boolean) => {
    const game = games.find((g) => g.id === gameId);
    socket.join(gameId);
    io.to(gameId).emit(
      "get-lobby",
      {
        gameId: gameId,
        gameName: game?.name,
        guideName: game?.guide?.name,
        travellersNames: game?.travellers.map((t) => t.name),
      },
      started
    );
  });
  //game
  socket.on(
    "send-game-location",
    (gameId: string, location: Place, position: string) => {
      try {
        let game = games.find((g) => g.id === gameId);
        socket.join(gameId);
        io.to(gameId).emit("get-game-location", {
          gameId: gameId,
          gameName: game?.name,
          guide: game?.guide?.name,
          travellers: game?.travellers,
          place:
            position && position === "first"
              ? game?.places[0]
              : position === "current"
              ? game?.places[game?.places.map((p) => p.id).indexOf(location.id)]
              : game?.places[
                  game?.places.map((p) => p.id).indexOf(location.id) + 1
                ],
        });
      } catch (e) {
        console.log(e);
      }
    }
  );
  //Travellers Points Change
  socket.on(
    "send-travellers-points",
    (
      gameId: string,
      playerId: string,
      increase: boolean,
      decrease: boolean
    ) => {
      try {
        if (increase || decrease) {
          games = games.map((g) =>
            g.id === gameId
              ? {
                  ...g,
                  travellersPoints: g.travellersPoints.map((t) =>
                    t.plyerId === playerId
                      ? { ...t, points: increase ? t.points + 1 : t.points - 1 }
                      : t
                  ),
                }
              : g
          );
        }

        socket.join(gameId);

        io.to(gameId).emit(
          "get-travellers-points",
          games.find((g) => g.id === gameId)?.travellersPoints
        );
      } catch (e) {
        console.log(e);
      }
    }
  );
  //Travellers Points Change
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
