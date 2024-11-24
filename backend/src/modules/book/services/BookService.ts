import {BookRepository} from "../repositories/BookRepository";
import {IGetBookOptions} from "../interfaces/IGetBookOptions";
import {IBookCreationAttributes} from "../interfaces/IBookCreationAttributes";
import {UUID} from "crypto";
import {IBook} from "../interfaces/IBook";

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    public async getAll(options: IGetBookOptions) {
        return await this.bookRepository.getAll(options);
    }

    public async getById(id: UUID){
        return await this.bookRepository.getById(id);
    }

    public async add(bookData: IBookCreationAttributes) {
        return await this.bookRepository.add(bookData);
    }

    public async update(bookData: IBook){
        return await this.bookRepository.update(bookData);
    }

    public async delete(id: UUID){
        return await this.bookRepository.delete(id);
    }

    public async maskAsFavorite(id: UUID){
        return await this.bookRepository.maskAsFavorite(id);
    }

    public async unmaskAsFavorite(id: UUID){
        return await this.bookRepository.unmarkAsFavorite(id);
    }

}
