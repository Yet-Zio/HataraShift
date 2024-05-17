import { NextFunction, Request, Response } from "express";

class APIError extends Error{
    constructor(public statusCode: number, message: string){
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (statusCode: number, message: string) => {
    statusCode = statusCode || 500
    message = message || "Internal Server Error"

    const error = new APIError(statusCode, message)
    return error
}

export const serverErrorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({err: "＞﹏＜: Error Occured", message})
}