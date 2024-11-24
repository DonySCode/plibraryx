import Server from "./server";

const port = parseInt(process.env.PORT || "3030");
const server = new Server(port);
server.start();
