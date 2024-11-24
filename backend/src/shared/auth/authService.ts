import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthService{
    public generateJwt(userId: string, email: string){
        const payload = {userId, email};
        const secret = process.env.JWT_SECRET || "secreto13";
        return jwt.sign(payload, secret, {expiresIn: "6h"});
    }

    public verifyJwt(token: string){
        const secret = process.env.JWT_SECRET || "secreto13";
        try{
            return jwt.verify(token, secret)
        } catch(error){
            throw new Error("Token invalido o vencido.")
        }
    }
}

export default new AuthService();
