import { createContext, useContext, useEffect, useState } from "react";
import socket from "../api/socket";
import { useAuth } from "../auth/AuthProvider";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (user?._id) {
      socket.auth = {
        token: document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1], // if token is not httpOnly
      };

      socket.connect();

      socket.on("connect", () => setConnected(true));
      socket.on("disconnect", () => setConnected(false));
    }

    return () => {
      socket.disconnect();
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
