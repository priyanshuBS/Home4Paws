import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL, {
  autoConnect: false, // we'll connect manually in provider
  withCredentials: true, // required for cookies
});

export default socket;
