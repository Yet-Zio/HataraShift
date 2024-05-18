import { NextFunction, Request, Response } from "express";

/**
 * This class extends the Error class for creating custom errors with server's statuscode and message.
 */
class APIError extends Error{
    constructor(public statusCode: number, message: string){
        super(message)
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * This method allows to throw an APIError instance when an error or malicious request is identified. The APIError instance is captured by @ref serverErrorHandler = (err: APIError, req: Request, res: Response, next: NextFunction)
 */
export const errorHandler = (statusCode: number, message: string) => {
    statusCode = statusCode || 500
    message = message || "Internal Server Error"

    const error = new APIError(statusCode, message)
    return error
}

/**
 * Error handler that handles any APIError instance that was thrown or returned and responds with its statuscode and message.
 */
export const serverErrorHandler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({err: "＞﹏＜: Error Occured", message})
}