import {BookService} from "../services/BookService";
import {Request, Response} from "express";

export class BookController{
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public async getAll(req: Request, res: Response){
        try {
            const books = await this.bookService.getAll();
            res.status(201).json(books);
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }
}
