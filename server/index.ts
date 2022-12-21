import express, { Application, Request, Response } from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { Server, Socket } from "socket.io";
import {
  Game,
  Traveller,
  Place,
  TravellerPoints,
  Guide,
  Callback,
} from "../types/gameTypes";

const PORT = process.env.PORT || 4000;
const app: Application = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let games: Game[] = [];

// Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on("connection", (socket: Socket) => {
  console.log("New connection", socket.id);

  //Create guide with an empty Game ID given from a guide
  socket.on("create-guide", (guide: Guide, callback: Callback) => {
    try {
      if (!games.find((g) => g.id === guide.id)) {
        const newGame: Game = {
          id: guide.id,
          name: "",
          guide: guide,
          travellers: [],
          places: [],
          travellersPoints: [],
          state: "setup",
          endGameCases: [],
        };
        games = [...games, newGame];
        callback({
          success: true,
          message: "Guide was created!",
        });
      } else {
        callback({
          success: false,
          message: "Ooops, something went wrong",
        });
      }
    } catch (e) {
      console.log(e);
    }
    console.log(games);
  });

  //Add place to the game
  socket.on(
    "add-location",
    (location: Place, gameId: string, callback: Callback) => {
      try {
        if (
          games.find(
            (g) =>
              g.id === gameId &&
              g.state === "setup" &&
              !g.places.find((p) => p.id === location.id)
          )
        ) {
          games = games.map((game) =>
            game.id === gameId
              ? { ...game, places: [...game.places, location] }
              : game
          );
          callback({
            success: true,
            message: "Location addded!",
          });
        } else {
          callback({
            success: false,
            message: "Ooops, something went wrong",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  //Add Game Name
  socket.on(
    "add-game-name",
    (gameName: string, gameId: string, callback: Callback) => {
      try {
        if (
          games.find(
            (g) =>
              g.id === gameId && g.state === "setup" && g.places.length !== 0
          )
        ) {
          games = games.map((game) =>
            game.id === gameId ? { ...game, name: gameName } : game
          );
          callback({
            success: true,
            message: "",
          });
        } else {
          callback({
            success: false,
            message: "Ooops, something went wrong",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  socket.on(
    "add-traveller",
    (traveller: Traveller, code: string, callback: Callback) => {
      try {
        if (
          games.find(
            (game) =>
              game.id === code &&
              game.state === "lobby" &&
              game.travellers.length < 6 &&
              !game.travellers.find((t) => t.id === traveller.id)
          )
        ) {
          const travellerPoints: TravellerPoints = {
            plyerId: traveller.id,
            points:
              Math.floor(
                parseInt(games.find((g) => g.id === code)?.places.length + "") /
                  2
              ) + 1,
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
          callback({
            success: true,
            message: "",
          });
        } else {
          callback({
            success: false,
            message: "Access Denied",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  //LOBBY
  socket.on(
    "send-lobby",
    (gameId: string, playerId: string, started: boolean) => {
      try {
        if (
          games.find(
            (g) =>
              g.id === gameId &&
              (g.travellers.find((t) => t.id === playerId) ||
                g.guide?.id === playerId)
          )
        ) {
          games = games.map((g) =>
            g.id === gameId ? { ...g, state: "lobby" } : g
          );
          let game = games.find((g) => g.id === gameId);
          let start =
            started && game && game.travellers && game.travellers.length !== 0
              ? true
              : false;
          if (start) {
            games = games.map((g) =>
              g.id === gameId ? { ...g, state: "running" } : g
            );
          }
          socket.join(gameId);
          io.to(gameId).emit(
            "get-lobby",
            {
              gameId: gameId,
              gameName: game?.name,
              guideName: game?.guide?.name,
              travellersNames: game?.travellers.map((t) => {
                return { id: t.id, name: t.name };
              }),
            },
            start
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  //GAME
  socket.on("send-game-players", (gameId: string, playerId: string) => {
    try {
      if (
        games.find(
          (g) =>
            g.id === gameId &&
            (g.travellers.find((t) => t.id === playerId) ||
              g.guide?.id === playerId)
        )
      ) {
        let game = games.find((g) => g.id === gameId);
        socket.join(gameId);
        io.to(gameId).emit("get-game-players", {
          gameId: gameId,
          gameName: game?.name,
          guide: game?.guide?.name,
          travellers: game?.travellers,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });

  socket.on(
    "send-game-location",
    (gameId: string, locationId: string, position: string) => {
      try {
        if (games.find((g) => g.id === gameId)) {
          socket.join(gameId);
          let game = games.find((g) => g.id === gameId);
          if (position === "current") {
            io.to(gameId).emit(
              "get-game-location",
              locationId
                ? game?.places.find((p) => p.id === locationId)
                : game?.places[0]
            );
          } else if (position === "next") {
            let lastPlace =
              game && game.places && game.places[game.places.length - 1];
            if (lastPlace?.id !== locationId) {
              io.to(gameId).emit(
                "get-game-location",
                game?.places[
                  game?.places.map((p) => p.id).indexOf(locationId) + 1
                ]
              );
            } else {
              io.to(gameId).emit("end-game", true);
            }
          }
        }
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
        if (
          !games
            .find((g) => g.id === gameId)
            ?.travellersPoints.find((t) => t.points > 0)
        ) {
          io.to(gameId).emit("end-game", true);
        } else {
          io.to(gameId).emit(
            "get-travellers-points",
            games.find((g) => g.id === gameId)?.travellersPoints
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  socket.on(
    "set-secret-visible",
    (gameId: string, revealTo: string, secretVisible: boolean) => {
      socket.join(gameId);
      io.to(gameId).emit("get-secret-visible", revealTo, secretVisible);
    }
  );
  //delete game
  socket.on("delete-game", (gameId: string, playerId: string) => {
    try {
      if (games.find((g) => g.id === gameId)) {
        games = games.filter((g) => g.id !== gameId);
      }
    } catch (e) {
      console.log(e);
    }
    console.log(games);
  });
  socket.on("delete-traveller", (gameId: string, playerId: string) => {
    try {
      if (games.find((g) => g.id === gameId)) {
        games = games.map((g) =>
          g.id === gameId
            ? {
                ...g,
                travellers: [...g.travellers.filter((t) => t.id !== playerId)],
                travellersPoints: [
                  ...g.travellersPoints.filter((t) => t.plyerId !== playerId),
                ],
              }
            : g
        );
      }
    } catch (e) {
      console.log(e);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
