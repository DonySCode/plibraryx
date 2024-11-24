import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class Database {
  private sequelize: Sequelize;
  private static instance: Database;

  private constructor() {
    this.sequelize = new Sequelize({
      dialect: "postgres",
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432"),
    });
  }

  private async createDatabaseIfNotExist(): Promise<void> {
    const dbName = process.env.DB_NAME || "plibraryx";

    try {
      await this.sequelize.authenticate();
      console.log("Conectado al servidor exitosamente.");

      const result = await this.sequelize.query(
        `SELECT * FROM pg_database WHERE datname = '${dbName}'`
      );

      if (!result[0].length) {
        await this.sequelize.query(`CREATE DATABASE ${dbName}`);
        console.log(`Base de datos "${dbName}" creada exitosamente.`);
      }
    } catch (error) {
      console.error("Error al conectarse a la base de datos.", error);
      throw error;
    }
  }

  public static getInstance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.createDatabaseIfNotExist();
      await this.sequelize.authenticate();
      console.log("La conexión a base de datos ha sido exitosa.");
    } catch (error) {
      console.error(
        "Ha ocurrido un error intentando conectar a la base datos: ",
        error
      );
      throw error;
    }
  }

  public getSequelize(): Sequelize {
    return this.sequelize;
  }
}

export default Database;
