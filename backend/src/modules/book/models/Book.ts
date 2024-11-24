import {DataTypes, Model} from "sequelize";
import Database from "../../../core/database";
import {IBook} from "../interfaces/IBook";
import {IUserCreationAttributes} from "../interfaces/IBookCreationAttributes";

class Book extends Model <IBook, IUserCreationAttributes> implements IBook {
    author!: string;
    coverImage?: string;
    genre!: string[];
    id!: string;
    isFavorite!: boolean;
    rating?: number;
    title!: string;
    userId!: string;
    year!: number;
}

const sequelize = Database.getInstance().getSequelize();

Book.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        genre: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        isFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: "books",
        timestamps: true,
    }
)

export default Book;
