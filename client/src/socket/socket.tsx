import io from "socket.io-client";
import { createContext } from "react";
import { API_URL } from "../config/constants";

export const socket = io(API_URL, {
  transports: ["websocket"],
});
export const SocketContext = createContext(socket);
