import { io } from "socket.io-client";

export const socket = io("https://qldapm-qlcf-be.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});
