import {UserRepository} from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import User from "../models/User";
import AuthService from "../../../shared/auth/authService";

export class UserService {
    private  userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async register(userData: { username: string; email: string; password: string;}): Promise<User>{
        const existingUser = await this.userRepository.getUserByEmail(userData.email);
        if(existingUser){
            throw new Error("El correo ya esta registrado.")
        }
        userData.password = await bcrypt.hash(userData.password, 10);
        return await this.userRepository.createUser(userData);
    }

    public async login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);
        if(!user){
            throw new Error("Usuario o contraseña incorrectos.");
        }
        const isPasswordValid = await bcrypt.compare(password, user.dataValues.password);
        if(!isPasswordValid){
            throw new Error("Usuario o contraseña incorrectos.");
        }
        return AuthService.generateJwt(user.id, user.email);
    }
}
