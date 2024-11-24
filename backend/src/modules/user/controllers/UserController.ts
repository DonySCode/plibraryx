import {Request, Response} from "express";
import {UserService} from "../services/UserService";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async register(req: Request, res: Response): Promise<void>{
        try {
            const user = await this.userService.register(req.body);
            res.status(201).json({message: "Usuario creado exitosamente: ", user});
        } catch(error: any){
            res.status(400).json({message: error.message})
        }
    }

    public async login(req: Request, res: Response): Promise<void>{
        const {email, password} = req.body;

        try {
            const token = await this.userService.login(email, password);
            res.status(200).json({message: "Se ha iniciado sesión exitosamente: ", token});
        } catch(error: any){
            res.status(401).json({message: error.message})
        }
    }

}
