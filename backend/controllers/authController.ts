import { Request, Response, NextFunction} from "express";
import { User } from "../models/User";
import { errorHandler } from "../utils/errorHandler";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
    } catch(err){
        return next(errorHandler)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{

    } catch(err){
        return next(errorHandler)
    }
}