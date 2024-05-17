import { Request, Response, NextFunction} from "express"
import { User } from "../models/User"
import { errorHandler } from "../utils/errorHandler"
import { hash, compare } from "bcrypt"
import { isLength } from "validator"
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { name, email, password } = req.body

        if(!(name && email && password)){
            return next(errorHandler(400, "INVALID_CREDENTIAL_FORMAT"))
        }

        const existingUser = await User.findOne({email: email})

        if(existingUser){
            return next(errorHandler(409, "EMAIL_ALREADY_EXISTS"))
        }

        if(!isLength(password, {min: 8, max: 256})){
            return next(errorHandler(409, "PASSWORD_LENGTH_FAILURE"))
        }

        const saltRounds = 10
        const hashPass = await hash(password, saltRounds)

        const newuser = await User.create({
            name, email, password: hashPass
        })

        let payload = {
            id: newuser.id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET as string)
        const expiresInWeek = 7 * 24 * 60 * 60
        const expiryDate = new Date(Date.now() + expiresInWeek * 1000)
        return res.cookie("accessToken", token, { httpOnly: true, expires: expiryDate }).status(200).json({success: true})
        
    } catch(err){
        return next(errorHandler)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { email, password } = req.body

        if(!(email && password)){
            return next(errorHandler(400, "INVALID_CREDENTIAL_FORMAT"))
        }

        const user = await User.findOne({email})

        if(!user){
            return next(errorHandler(404, "USER_NOT_FOUND"))
        }

        const comparePass = await compare(password, user.password)

        if(comparePass){
            const payload = {
                id: user.id
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET as string)
            const expiresInWeek = 7 * 24 * 60 * 60
            const expiryDate = new Date(Date.now() + expiresInWeek * 1000)
            return res.cookie("accessToken", token, { httpOnly: true, expires: expiryDate }).status(200).json({success: true})
        }
        else{
            return next(errorHandler(401, "INCORRECT_PASSWORD"))
        }
    } catch(err){
        return next(errorHandler)
    }
}