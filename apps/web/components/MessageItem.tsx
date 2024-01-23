import { CircleUserRound } from "lucide-react";
import React from "react";

export default function MessageItem({ message }: { message: string }) {
  return (
    <div className="__message_item w-full p-3 flex gap-2 bg-purple-700 border-[1px] border-purple-500 text-white rounded">
      <CircleUserRound /> {message}
    </div>
  );
}
