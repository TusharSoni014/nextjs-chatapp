import Redis from "ioredis";
import { Server } from "socket.io";

//pub = publisher
const pub = new Redis({
  host: "redis-23efb408-techandrow-31b9.a.aivencloud.com",
  port: 21258,
  username: "default",
  password: "AVNS_W0iZyPKyh63g1nw7OHB",
});

//sub = subscriber
const sub = new Redis({
  host: "redis-23efb408-techandrow-31b9.a.aivencloud.com",
  port: 21258,
  username: "default",
  password: "AVNS_W0iZyPKyh63g1nw7OHB",
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
