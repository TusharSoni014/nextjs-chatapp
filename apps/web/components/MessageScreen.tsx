"use client";
import React from "react";
import { useSocket } from "../context/SocketProvider";
import MessageItem from "./MessageItem";

export default function MessageScreen() {
  const { messages } = useSocket();
  return (
    <div className="__message_screen flex flex-col gap-2 border-[1px] w-full h-[calc(100%-60px)] border-slate-800 rounded p-3 bg-slate-900 max-w-[500px]">
      {messages.length===0 && <p className=" text-slate-500">No messages are found!</p>}
      {messages.map((msg, index) => {
        return <MessageItem key={index} message={msg} />;
      })}
    </div>
  );
}
