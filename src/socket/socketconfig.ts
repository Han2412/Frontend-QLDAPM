import ioClient from "socket.io-client";

export const socket = ioClient("http://localhost:3000");
