import Book from "../models/Book";
import {IBookCreationAttributes} from "../interfaces/IBookCreationAttributes";
import {UUID} from "crypto";
import {IBook} from "../interfaces/IBook";

export class BookRepository {
    public async add(bookData: IBookCreationAttributes){
        try {
            return await Book.create(bookData);
        } catch (error){
            console.error("Error al agregar libro: ", error);
            throw error;
        }
    }

    public async getAll(){
        try {
            return await Book.findAll()
        } catch (error){
            console.error("Error al buscar libros: ", error);
            throw error;
        }
    }

    public async getById(id: UUID){
        try {
            return await Book.findOne({where: {id}})
        } catch (error){
            console.error("Error al buscar libro: ", error);
            throw error;
        }
    }

    public async getByUser(userId: UUID){
        try {
            return await Book.findAll({where: {userId}})
        } catch (error){
            console.error("Error al buscar libros: ", error);
            throw error;
        }
    }

    public async update(bookData: IBook){
        try {
            return await Book.update(bookData,{
                where: {
                    id: bookData.id
                }
            });
        } catch (error){
            console.error("Error al actualizar la información de este libro.", error);
            throw error;
        }
    }

    public async delete(id: UUID){
        try {
            return await Book.destroy({where: {id}})
        } catch (error){
            console.error("Error al remover este libro.", error);
            throw error;
        }
    }

    public async maskAsFavorite(id: UUID){
        try {
            return await Book.update({isFavorite: true},{where: {id}});
        } catch (error){
            console.error("Error al marcar este libro como favorito.", error);
            throw error;
        }
    }

    public async unmarkAsFavorite(id: UUID){
        try {
            return await Book.update({isFavorite: false},{where: {id}});
        } catch (error){
            console.error("Error al desmarcar este libro como favorito.", error);
            throw error;
        }
    }
}
