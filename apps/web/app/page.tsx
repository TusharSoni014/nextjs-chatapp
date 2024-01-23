import { TbBrandNextjs } from "react-icons/tb";
import MessageScreen from "../components/MessageScreen";
import MessageSender from "../components/MessageSender";
import { SiTypescript,SiRedis, SiTailwindcss, SiSocketdotio, SiTurborepo } from "react-icons/si";

export default function Page(): JSX.Element {
  return (
    <main className="h-[100vh] bg-black text-white flex ">
      <div className="__left flex-1 bg-slate-900 p-3 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-center w-full">NEXT.JS Socket.io</h1>
        <p className="text-red-500 font-bold">Chat App</p>
        <div className="__logo_container flex text-2xl gap-2 mt-4">
          <SiTypescript className="text-[#3178c6]"/>
          <SiRedis className="text-[#D82C20]"/>
          <TbBrandNextjs />
          <SiTailwindcss className="text-blue-500"/>
          <SiSocketdotio />
          <SiTurborepo />
        </div>
      </div>
      <div className="__right flex flex-col flex-1 justify-center items-center gap-2 p-3">
        <MessageScreen />
        <MessageSender />
      </div>
    </main>
  );
}
