import User from "../models/User"
import {IUserCreationAttributes} from "../interfaces/IUserCreationAttributes";

export class UserRepository{
    public async createUser(userData: IUserCreationAttributes){
        try {
            return await User.create(userData)
        } catch (error){
            console.error("Error al crear usuario: ", error);
            throw error;
        }
    }

    public async getUserByEmail(email: string) {
        try {
            return await User.findOne({where: {email}})
        } catch (error) {
            console.error("Error al obtener usuario por email: ", error);
            throw error;
        }
    }
}
