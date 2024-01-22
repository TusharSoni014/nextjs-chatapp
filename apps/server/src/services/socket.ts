import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    console.log("initializing SocketService...");
    this._io = new Server();
  }
  get io() {
    return this._io;
  }
  public initListeners() {
    const io = this.io;
    console.log("initializing Socket Listeners...");
    io.on("connect", async (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("new message from socket", message);
      });
    });
  }
}

export default SocketService;
