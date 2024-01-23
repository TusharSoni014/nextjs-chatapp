import Redis from "ioredis";
import { Server } from "socket.io";

//pub = publisher
const pub = new Redis({
  host: "REDIS_SERVER_HOST",
  port: 21258,
  username: "default",
  password: "REDIS_PASSWORD",
});

//sub = subscriber
const sub = new Redis({
  host: "REDIS_SERVER_HOST",
  port: 21258,
  username: "default",
  password: "REDIS_PASSWORD",
});

class SocketService {
  private _io: Server;
  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }
  get io() {
    return this._io;
  }
  public initListeners() {
    const io = this.io;
    io.on("connect", async (socket) => {
      socket.on("newMessage", async ({ message }: { message: string }) => {
        console.log("new message from socket", message);
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }
}

export default SocketService;
