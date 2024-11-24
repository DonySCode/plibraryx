import {BookRepository} from "../repositories/BookRepository";
import Book from "../models/Book";

export class BookService {
    private  bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    public async getAll(): Promise<Book[]>{
        return await this.bookRepository.getAll();
    }

}
