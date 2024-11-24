import User from "../models/User"

export class UserRepository{
    public async createUser(userData: {username: string; email: string; password: string;}){
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

    public async getUserByUsername(username: string) {
        try {
            return await User.findOne({where: {username}})
        } catch (error) {
            console.error("Error al obtener usuario por username: ", error);
            throw error;
        }
    }
}
