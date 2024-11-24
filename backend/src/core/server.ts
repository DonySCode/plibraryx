import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import Database from "./database";
import errorHandler from "./errorHandler";

class Server {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  private configureMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(errorHandler);
  }

  public async start() {
    try {
      const db = Database.getInstance();
      await db.connect();

      this.configureMiddlewares();
      this.app.listen(this.port, () => {
        console.log(`Listening on port ${this.port}`);
      });
    } catch (error) {
      console.error("Error al iniciar el servidor: ", error);
    }
  }
}

export default Server;
