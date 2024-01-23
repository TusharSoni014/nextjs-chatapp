import MessageScreen from "../components/MessageScreen";
import MessageSender from "../components/MessageSender";

export default function Page(): JSX.Element {
  return (
    <main className="h-[100vh] bg-black text-white p-3 flex justify-center items-center flex-col gap-2">
      <MessageScreen />
      <MessageSender />
    </main>
  );
}
