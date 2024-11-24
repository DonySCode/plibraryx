import { Optional } from "sequelize";
import {IBook} from "./IBook";

export interface IUserCreationAttributes extends Optional<IBook, "id"> {}
