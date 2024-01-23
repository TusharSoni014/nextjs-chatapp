"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { io } from "socket.io-client";

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
  const sendMessage: ISocketProvider["sendMessage"] = useCallback((msg) => {
    console.log("sendMessage", msg);
  }, []);

  //whenever this provider gets mounted, it will create a socket connection with backend, and when we close the page, it will get closed due to cleanup function.
  useEffect(() => {
    const _socket = io("http://localhost:8000");
    return () => {
      _socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
