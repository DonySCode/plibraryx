import {Request, Response, NextFunction} from "express";
import AuthService from "../auth/authService";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token){
        res.status(401).json({message: "Por favor, proporcione un token."})
        return;
    }
    try {
        // @ts-ignore
        req.user = AuthService.verifyJwt(token);
        next();
    } catch(error) {
        res.status(401).json({message: 'Token invalido'})
    }
}
