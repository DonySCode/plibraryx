import { Optional } from "sequelize";
import {IUser} from "./IUser";

export interface IUserCreationAttributes extends Optional<IUser, "id"> {}
