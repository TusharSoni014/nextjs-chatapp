import http from "http";
import SocketService from "./services/socket";

async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT ? process.env.PORT : 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, function () {
    console.log("server listening on port: " + PORT);
  });

  socketService.initListeners();
}
init();
