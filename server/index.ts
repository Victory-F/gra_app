import express, { Application } from "express";
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
  EndGameCase,
} from "../types/gameTypes";

const PORT = process.env.PORT || 4000;
const app: Application = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//array to collect all the games
let games: Game[] = [];

// Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on("connection", (socket: Socket) => {
  //Create guide with a game
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
          message: "Guide Created",
        });
      } else {
        callback({
          success: false,
          message: "Ooops, Error",
        });
      }
    } catch (e) {
      console.log(e);
    }
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
            message: "Location Addded",
          });
        } else {
          callback({
            success: false,
            message: "Ooops, Error",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  //Add EndGame Cases
  socket.on(
    "add-endgame-cases",
    (gameId: string, endGameCases: EndGameCase[], callback: Callback) => {
      try {
        if (
          games.find(
            (g) =>
              g.id === gameId && g.state === "setup" && g.places.length !== 0
          )
        ) {
          games = games.map((game) =>
            game.id === gameId ? { ...game, endGameCases: endGameCases } : game
          );
          callback({
            success: true,
            message: "Cases Created",
          });
        } else {
          callback({
            success: false,
            message: "Ooops, Error",
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
            message: "Ooops, Error",
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
              g.state !== "running" &&
              (g.guide?.id === playerId ||
                g.travellers.find((t) => t.id === playerId))
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
            g.state === "running" &&
            (g.travellers.find((t) => t.id === playerId) ||
              g.guide?.id === playerId)
        )
      ) {
        let game = games.find((g) => g.id === gameId);
        socket.join(gameId);
        io.to(gameId).emit("get-game-players", {
          gameId: gameId,
          gameName: game?.name,
          guide: game?.guide,
          travellers: game?.travellers,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
  //send game place
  socket.on(
    "send-game-location",
    (gameId: string, locationId: string, position: string) => {
      try {
        if (games.find((g) => g.id === gameId && g.state === "running")) {
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
              games = games.map((g) =>
                g.id === gameId
                  ? {
                      ...g,
                      state: "ended",
                      endGameCases: g.endGameCases.filter(
                        (c) => c.type === "won"
                      ),
                    }
                  : g
              );
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
        if (games.find((g) => g.id === gameId && g.state === "running")) {
          if (increase || decrease) {
            games = games.map((g) =>
              g.id === gameId
                ? {
                    ...g,
                    travellersPoints: g.travellersPoints.map((t) =>
                      t.plyerId === playerId
                        ? {
                            ...t,
                            points: increase
                              ? t.points + 1
                              : t.points > 0
                              ? t.points - 1
                              : 0,
                          }
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
            games = games.map((g) =>
              g.id === gameId
                ? {
                    ...g,
                    state: "ended",
                    endGameCases: g.endGameCases.filter(
                      (c) => c.type === "lost"
                    ),
                  }
                : g
            );
          } else {
            io.to(gameId).emit(
              "get-travellers-points",
              games.find((g) => g.id === gameId)?.travellersPoints
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  );

  //secret visible
  socket.on(
    "set-secret-visible",
    (gameId: string, revealTo: string, secretVisible: boolean) => {
      try {
        if (games.find((g) => g.id === gameId && g.state === "running")) {
          socket.join(gameId);
          io.to(gameId).emit("get-secret-visible", revealTo, secretVisible);
        }
      } catch (e) {
        console.log(e);
      }
    }
  );
  //endgame
  socket.on("set-endgame", (gameId: string) => {
    try {
      if (games.find((g) => g.id === gameId && g.state === "ended")) {
        socket.join(gameId);
        io.to(gameId).emit(
          "get-endgame",
          games.find((g) => g.id === gameId)?.endGameCases[0]
        );
      }
    } catch (e) {
      console.log(e);
    }
  });

  //delete traveller
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

  //delete game
  socket.on("delete-game", (gameId: string, playerId: string) => {
    try {
      if (games.find((g) => g.id === gameId && playerId === gameId)) {
        games = games.filter((g) => g.id !== gameId);
      }
    } catch (e) {
      console.log(e);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
