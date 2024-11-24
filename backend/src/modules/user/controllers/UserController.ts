import {Request, Response} from "express";
import {UserService} from "../services/UserService";
import {randomUUID} from "crypto";
import bcrypt from "bcrypt";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async register(req: Request, res: Response){
        let {username, email, password} = req.body;
        try {
            const emailExists = await this.userService.getUserByEmail(email);
            if (emailExists) {
                res.status(500).json({message: "Ya se ha usado esta dirección de correo electrónico."})
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                await this.userService.registerUser({username, email, password: hashedPassword});
                res.status(201).json({message: "Usuario creado exitosamente."})
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
