import { DataTypes, Model, Optional } from "sequelize";
import {IUser} from "../interfaces/IUser";
import {IUserCreationAttributes} from "../interfaces/IUserCreationAttributes";
import Database from "../../../core/database";

class User extends Model <IUser, IUserCreationAttributes> implements IUser {
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
}
const sequelize = Database.getInstance().getSequelize();

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "users",
        timestamps: true,
    }
)

export default User;
