import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/errorHandler"
import { NextFunction, Response } from "express"
import { AuthenticatedRequest } from "../types"

/**
 * This middleware is responsible for verifying a request towards a protected body such as shifts. It checks whether the user is logged in and whether the JWT token is valid.
 * @param req.cookie Should contain the accessToken created by jwt.sign(payload, secret)
 * @param next The flow is passed to the requested route once verification succeeds.
 * @returns Nothing unless an error occurs resulting in either an expired or invalid token.
 */
export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken

    if(!token){
        return next(errorHandler(401, "Unauthorized"))
    }
    else{
        jwt.verify(token , process.env.JWT_SECRET as string , (err: any , user: any) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(errorHandler(401, "Unauthorized: Expired token"));
                } else {
                    return next(errorHandler(400, "Invalid token"));
                }
            }
            req.user = user;
            next();
        })
    }
}