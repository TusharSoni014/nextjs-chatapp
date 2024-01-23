"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketProvider {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketProvider | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error("No state found!");
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const sendMessage: ISocketProvider["sendMessage"] = useCallback(
    (msg) => {
      if (socket) {
        socket.emit("newMessage", { message: msg });
      }
    },
    [socket]
  );

  const onMessageRecieved = useCallback((msg: string) => {
    const { message } = JSON.parse(msg) as { message: string };
    console.log(message);
  }, []);

  //whenever this provider gets mounted, it will create a socket connection with backend, and when we close the page, it will get closed due to cleanup function.
  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRecieved);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off("message");
      setSocket(undefined);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
