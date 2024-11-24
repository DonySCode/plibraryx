import {Request, Response} from "express";
import {UserService} from "../services/UserService";
import {randomUUID} from "crypto";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async register(req: Request, res: Response){
        let {username, email, password} = req.body;
        const id = randomUUID()
        try {
            const usernameExists = await this.userService.getUserByUsername(username);
            if (usernameExists) {
                res.status(500).json({message: "Este nombre de usuario no está disponible."})
            } else {
                password =
                const user = await this.userService.registerUser({id, username, email, password});
                res.status(201).json(user)
            }
        } catch (error){
            res.status(500).json({message: "Error al registrar este usuario"});
        }
    }

    public async getUser(req: Request, res: Response){
        const username = req.params.username

        try {
            const user = await this.userService.getUserByUsername(username);
            if(!user){
                res.status(404).json({message: "Usuario no encontrado."});
            } else {
                res.status(200).json(user)
            }
        } catch (error){
            res.status(500).json({message: "Error al obtener este usuario"});
        }
    }
}
