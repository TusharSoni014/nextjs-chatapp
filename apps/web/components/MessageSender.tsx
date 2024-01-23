"use client";
import React, { FormEvent, useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function MessageSender() {
  const [msgInput, setMessageInut] = useState<string>("");
  const { sendMessage } = useSocket();

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(msgInput);
    setMessageInut("");
  };
  return (
    <form
      onSubmit={handleSendMessage}
      className="flex gap-2 w-full justify-center items-center max-w-[500px]"
    >
      <input
        className="p-2 rounded bg-slate-950 border-[1px] w-[80%] border-slate-800 outline-none"
        type="text"
        placeholder="Type Your Message Here..."
        value={msgInput}
        onChange={(e) => setMessageInut(e.target.value)}
        required
      />
      <button className="p-2 w-[20%] px-4 bg-blue-600 rounded" type="submit">
        Send
      </button>
    </form>
  );
}
