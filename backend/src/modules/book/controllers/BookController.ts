import {BookService} from "../services/BookService";
import {Request, Response} from "express";
import book from "../models/Book";

export class BookController{
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public async add(req: Request, res: Response){
        try {
            // @ts-ignore
            const userId = req.user.userId;
            if(!userId){
                res.status(401).json(userId);
                return;
            }
            const book = await this.bookService.add({
                ...req.body,
                userId
            });
            res.status(201).json(book);
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async getAll(req: Request, res: Response){
        try {
            // @ts-ignore
            const userId = req.user.userId;
            if(!userId){
                return res.status(401).redirect("/login")
            }
            const books = await this.bookService.getAll({
                page: req.query.page? parseInt(req.query.page as string, 10) : 1,
                limit: req.query.limit? parseInt(req.query.limit as string, 10) : 10,
                search: req.query.search as string,
                author: req.query.author as string,
                year: req.query.year? parseInt(req.query.year as string, 10) : undefined,
                genre: req.query.genre? (req.query.genre as string).split(","): undefined,
                userId
            });
            res.status(200).json(books);
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async getById(req: Request, res: Response){
        try {
            const bookId = req.params.id;
            const book = await this.bookService.getById(bookId);
            res.status(200).json(book);
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async update(req: Request, res: Response){
        try {
            const bookId = req.params.id;
            const book = await this.bookService.update({
                ...req.body,
                id: bookId
            });
            res.status(201).json({message: "Libro actualizado correctamente."});
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const id = req.params.id;
            await this.bookService.delete(id);
            res.status(200).json({message: "Libro eliminado exitosamente"});
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async maskAsFavorite(req: Request, res: Response){
        try {
            const id = req.params.id;
            await this.bookService.maskAsFavorite(id);
            res.status(200).json({message: "Libro agregado a favoritos"});
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async unmaskAsFavorite(req: Request, res: Response){
        try {
            const id = req.params.id;
            await this.bookService.unmaskAsFavorite(id);
            res.status(200).json({message: "Libro agregado a favoritos"});
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }
}
