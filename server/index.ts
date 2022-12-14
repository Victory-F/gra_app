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
} from "../types/gameTypes";

const PORT = process.env.PORT || 4000;
const app: Application = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MAKE IT BETTER!
const games: { [key: string]: GameState } = {};

app.get("/game", (req: Request, res: Response) => {
  const rand = Math.random().toString().slice(2, 8);
  // Create new game
  games[rand] = {
    state: "setup",
    game: {
      id: rand,
      name: "",
      guide: null,
      travellers: null,
      places: null,
    },
  };
  console.log(`New game created with gameId: ${rand}`);
  res.send({ id: rand });
});

// Every socket.on and socket.emit needs to be wrapped around "io.on('connection, socket)"
io.on("connection", (socket: Socket) => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
