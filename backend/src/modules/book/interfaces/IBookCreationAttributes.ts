import { Optional } from "sequelize";
import {IBook} from "./IBook";

export interface IBookCreationAttributes extends Optional<IBook, "id"> {}
